const mongoose = require("mongoose");
const { HOSTEL, DEPARTMENT, CLUB } = require("../utils/constants");

const ansSchema = new mongoose.Schema({
  Author: {
    type: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'User' }]
    ,
  },
  text: {
    type: String,
  },
  voteCount: {
    type: Number,
  },
  postedOn: {
    type: Date,
  },
  
});

const Ans = mongoose.model("Ans", ansSchema);
module.exports = Ans;
