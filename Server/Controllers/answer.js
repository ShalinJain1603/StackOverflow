const Answer = require("../models/answer");
const Question = require("../models/question");
const User = require("../models/user");

module.exports.addAnswer = async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({ outlook_id: req.user.id });
  const question = await Question.findById(id);
  const answer = new Answer(req.body);
  answer.author = user;
  answer.voteCount = 0;
  question.answers.push(answer);
  await answer.save();
  await question.save();
  res.send("Answer added successfully");
};

module.exports.deleteAnswer = async (req, res) => {
  const { id, answerId } = req.params;
  await Question.findByIdAndUpdate(id, { $pull: { answers: answerId } });
  await Answer.findByIdAndDelete(answerId);
  res.send(" Answer deleted successfully");
};
