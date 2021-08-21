const Answer = require("../models/answer");
const Question = require("../models/question");
const User = require("../models/user");
const getDate = require("../utils/getDate");
const Vote = require("../models/votes");

module.exports.addAnswer = async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({ outlook_id: req.user.id });
  const question = await Question.findById(id)
    .populate("author", "firstname")
    .populate({
      path: "answers",
      populate: [
        {
          path: "replies",
        },
        {
          path: "author",
        },
      ],
    })
    .populate({
      path: "votes",
      populate: [
        {
          path: "user",
        },
      ],
    });
  const answer = new Answer(req.body);
  answer.author = user;
  answer.voteCount = 0;
  answer.postedOn = new Date(getDate());
  question.answers.push(answer);
  await answer.save();
  await question.save();
  res.json(question);
};

module.exports.deleteAnswer = async (req, res) => {
  const { id, answerId } = req.params;
  await Question.findByIdAndUpdate(id, { $pull: { answers: answerId } });
  await Answer.findByIdAndDelete(answerId);
  res.send(" Answer deleted successfully");
};

module.exports.addVoteToAnswer = async (req, res) => {
  const { id, answerId } = req.params;
  const answer = await Answer.findById(answerId).populate({
    path: "votes",
    populate: {
      path: "user",
    },
  });
  const userId = req.user.id;
  const user = await User.findOne({ outlook_id: userId });
  const vote = req.body.vote;
  const newVote = new Vote({
    user: user._id,
    vote,
  });
  await newVote.save();
  if (!(vote == 0 || vote == 1 || vote == -1)) {
    res.send("Invalid Vote");
  }
  const existingVote = answer.votes.find((v) => v.user._id.equals(user._id));
  if (existingVote) {
    answer.voteCount += vote - existingVote.vote;
    answer.votes.pull(existingVote);
    answer.votes.push(newVote);
  } else if (vote != 0) {
    answer.voteCount += vote;
    answer.votes.push(newVote);
  }
  await answer.save();
  const question = await Question.findById(id)
    .populate("author", "firstname")
    .populate({
      path: "answers",
      populate: [
        {
          path: "replies",
        },
        {
          path: "author",
        },
      ],
    })
    .populate({
      path: "votes",
      populate: [
        {
          path: "user",
        },
      ],
    });
  res.json(question);
};
