const mongoose = require("mongoose");
const { HOSTEL, DEPARTMENT, CLUB } = require("../utils/constants");

const quesSchema = new mongoose.Schema({
  Author: {
    type: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'User' }]
    ,
  },
  text: {
    type: String,
  },
  tags: {
    type: [String],
  },
  comments: {
    type: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'User' }]
    ,
  },
  voteCount: {
    type: Number,
  },
  postedOn: {
    type: Date,
  },
  
});

const Ques = mongoose.model("Ques", quesSchema);
module.exports = Ques;
