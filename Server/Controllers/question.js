const Question = require("../models/question");
const User = require("../models/user");
const Answer = require("../models/answer"); // For populating Answers field
const getDate = require("../utils/getDate");

module.exports.showAllQuestions = async (req, res) => {
  const questions = await Question.find({}).populate("author");
  res.json(questions);
};

module.exports.showOneQuestion = async (req, res) => {
  const { id } = req.params;
  const question = await Question.findById(id)
    .populate("author", "firstname")
    .populate("answers");
  res.json(question);
};

module.exports.addQuestion = async (req, res) => {
  const user = await User.findOne({ outlook_id: req.user.id });
  const question = new Question(req.body);
  question.author = user;
  question.voteCount = 0;
  question.postedOn = new Date(`${getDate()}`);
  await question.save();
  res.send("Added new question");
};

module.exports.editQuestion = async (req, res) => {
  const { id } = req.params;
  const question = await Question.findByIdAndUpdate(id, { text: "Meowww" });
  console.log(question);
  res.send("Edited question");
};

module.exports.deleteQuestion = async (req, res) => {
  const { id } = req.params;
  const question = await Question.findByIdAndDelete(id);
  console.log(question);
  res.send("Deleted Question");
};
