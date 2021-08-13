const Question = require("../models/question");
const User = require("../models/user");
const Answer = require("../models/answer");

module.exports.showAllQuestions = async (req, res) => {
  const questions = await Question.find({});
  res.json(questions);
};

module.exports.showOneQuestion = async (req, res) => {
  const { id } = req.params;
  const question = await Question.findById(id)
    .populate("author")
    .populate("answers");
  res.json(question);
};

module.exports.addQuestion = async (req, res) => {
  const user = await User.findOne({ outlook_id: req.user.id });
  const question = new Question(req.body);
  question.author = user;
  await question.save();
  console.log(question);
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
