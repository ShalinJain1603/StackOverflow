const mongoose = require("mongoose");


const answerSchema = new mongoose.Schema({
  author: {
     
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' }
    ,
  
  text: {
    required : true,
    type: String,
  },
  voteCount: {
    type: Number,
  },
  postedOn: {
    type: Date,
  },
  
});

const Answer = mongoose.model("Answer", ansSchema);
module.exports = Answer;
