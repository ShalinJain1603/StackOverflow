const mongoose = require("mongoose");
const Answer = require("./answer");
const Vote = require("./votes");

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
  votes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vote",
    },
  ],
  resolved: {
    type: Boolean,
  },
});

questionSchema.post("findOneAndDelete", (data) => {
  data.answers.map(async (answer) => {
    await Answer.findByIdAndDelete(answer);
  });
});

const Question = mongoose.model("Question", questionSchema);
module.exports = Question;
