const User = require("../models/user");
const Question = require("../models/question");

const isAuthor = async (req, res, next) => {
  const { id } = req.params;
  const question = await Question.findById(id);
  const user = await User.findOne({ outlook_id: req.user.id });
  if (question.author.equals(user._id)) {
    next();
  } else {
    res.send("User not allowed");
  }
};

module.exports = isAuthor;
