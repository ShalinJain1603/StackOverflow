const mongoose = require("mongoose");

const replySchema = new mongoose.Schema({
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
  votes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vote"
    }
  ]
});

const Reply = mongoose.model("Reply", replySchema);
module.exports = Reply;
