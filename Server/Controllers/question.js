const Question = require("../models/question");
const User = require("../models/user");
const Answer = require("../models/answer"); // For populating Answers field
const Reply = require("../models/replyAnswer"); // For populating Replies field
const Vote = require("../models/votes");
const getDate = require("../utils/getDate");

module.exports.showAllQuestions = async (req, res) => {
  const questions = await Question.find({}).populate("author");
  res.json(questions);
};

module.exports.showOneQuestion = async (req, res) => {
  const { id } = req.params;
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
    });
  res.json(question);
};

module.exports.addQuestion = async (req, res) => {
  const user = await User.findOne({ outlook_id: req.user.id });
  const question = new Question(req.body);
  question.author = user;
  question.voteCount = 0;
  question.postedOn = new Date(24 - 7 - 16);
  await question.save();
  res.send("Added new question");
};

module.exports.editQuestion = async (req, res) => {
  const { id } = req.params;
  const question = await Question.findByIdAndUpdate(id, req.body);
  console.log(question);
  res.send("Edited question");
};

module.exports.deleteQuestion = async (req, res) => {
  const { id } = req.params;
  const question = await Question.findByIdAndDelete(id);
  console.log(question);
  res.send("Deleted Question");
};

module.exports.addVote = async (req, res) => {
  const { id } = req.params;
  const question = await Question.findById(id).populate("votes");
  const userId = req.user.id;
  const user = await User.findOne({ outlook_id: userId });
  const vote = req.body.vote;
  const newVote = new Vote(
    {
      user: user._id,
      vote
    }
  );
  //console.log(newVote);
  if (!(vote == 0 || vote == 1 || vote == -1)) {
    res.send("Invalid Vote");
  }
  const existingVote = question.votes.find(v => v?.user == user._id);
  //console.log(existingVote, user._id);
  if (existingVote) {
    question.voteCount -= existingVote.vote;
    if (vote == 0) {
      question.votes.pull(existingVote);
    }
    else {
      question.voteCount += vote;
      question.votes.push(newVote);
    }
  }
  else if (vote != 0) {
    question.voteCount += vote;
    console.log("before push", question.votes);
    console.log(newVote);
    question.votes.push(newVote);
    console.log("after push", question.votes);
  }
  await question.save();
  //console.log(question.votes);
  res.send("Vote added");
}
