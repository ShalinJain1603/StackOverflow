const Answer = require("../models/answer");
const Reply = require("../models/replyAnswer");
const User = require("../models/user");
const Vote = require("../models/votes");
const Question = require("../models/question");
const getDate = require("../utils/getDate");
const { get } = require("mongoose");

module.exports.addReply = async (req, res) => {
  const { id, answerId } = req.params;
  const user = await User.findOne({ outlook_id: req.user.id });
  const answer = await Answer.findById(answerId);
  const reply = new Reply(req.body);
  reply.author = user;
  reply.voteCount = 0;
  //const date = `${getDate()}`;
  reply.postedOn = new Date(getDate());
  answer.replies.push(reply);
  await reply.save();
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

module.exports.deleteReply = async (req, res) => {
  const { replyId, answerId } = req.params;
  await Answer.findByIdAndUpdate(answerId, { $pull: { replies: replyId } });
  await Reply.findByIdAndDelete(replyId);
  res.send(" Reply deleted successfully");
};

module.exports.addVote = async (req, res) => {
  const { id, replyId } = req.params;
  const reply = await Reply.findById(replyId).populate({
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
  const existingVote = reply.votes.find((v) => v.user._id.equals(user._id));
  if (existingVote) {
    reply.voteCount += vote - existingVote.vote;
    reply.votes.pull(existingVote);
    reply.votes.push(newVote);
  } else if (vote != 0) {
    reply.voteCount += vote;
    reply.votes.push(newVote);
  }
  await reply.save();
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
