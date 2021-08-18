const mongoose = require("mongoose");
const Reply = require("./replyAnswer");

const answerSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  text: {
    required: true,
    type: String,
  },
  voteCount: {
    type: Number,
  },
  postedOn: {
    type: Date,
  },
  replies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reply",
    },
  ],
  votes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vote"
    }
  ]
});

answerSchema.post("findOneAndDelete", async (data) => {
  await Reply.deleteMany({ _id: { $in: data.replies } });
});

const Answer = mongoose.model("Answer", answerSchema);
module.exports = Answer;
