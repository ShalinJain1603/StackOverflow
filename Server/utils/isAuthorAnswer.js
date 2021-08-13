const User = require("../models/user");
const Question = require("../models/question");
const Answer = require("../models/answer");

const isAuthorAnswer = async (req, res, next) => {
  const { id, answerId } = req.params;
  const question = await Question.findById(id);
  const user = await User.findOne({ outlook_id: req.user.id });
  const answer = await Answer.findById(answerId);
  if (question.author.equals(user._id) || answer.author.equals(user._id)) {
    next();
  } else {
    res.send("User not allowed");
  }
};

module.exports = isAuthorAnswer;
