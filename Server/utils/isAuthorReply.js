const User = require("../models/user");
const Question = require("../models/question");
const Answer = require("../models/answer");
const Reply = require("../models/replyAnswer");

const isAuthorReply = async (req, res, next) => {
  const { id, answerId, replyId } = req.params;
  const question = await Question.findById(id);
  const user = await User.findOne({ outlook_id: req.user.id });
  const answer = await Answer.findById(answerId);
  const reply = await Reply.findById(replyId);
  if (
    reply.author.equals(user._id) ||
    answer.author.equals(user._id) ||
    question.author.equals(user._id)
  ) {
    next();
  } else {
    res.send("User not allowed");
  }
};

module.exports = isAuthorReply;
