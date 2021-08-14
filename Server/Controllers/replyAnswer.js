const Answer = require("../models/answer");
const Reply = require("../models/replyAnswer");
const User = require("../models/user");
const getDate = require("../utils/getDate");

module.exports.addReply = async (req, res) => {
  const { answerId } = req.params;
  const user = await User.findOne({ outlook_id: req.user.id });
  const answer = await Answer.findById(answerId);
  const reply = new Reply(req.body);
  reply.author = user;
  reply.voteCount = 0;
  const date = `${getDate()}`;
  reply.postedOn = new Date(date);
  answer.replies.push(reply);
  await reply.save();
  await answer.save();
  res.send("Reply added successfully");
};

module.exports.deleteReply = async (req, res) => {
  const { replyId, answerId } = req.params;
  await Answer.findByIdAndUpdate(answerId, { $pull: { replies: replyId } });
  await Reply.findByIdAndDelete(replyId);
  res.send(" Reply deleted successfully");
};
