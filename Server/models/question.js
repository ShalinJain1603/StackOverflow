const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    required: true,
    type: String,
    maxLength: 100,
  },
  text: {
    required: true,
    type: String,
  },
  tags: {
    type: [String],
  },
  answers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Answer",
    },
  ],
  voteCount: {
    type: Number,
  },
  postedOn: {
    type: Date,
  },
});

const Question = mongoose.model("Question", questionSchema);
module.exports = Question;
