const mongoose = require("mongoose");
const passLocalMongoose = require("passport-local-mongoose");
const { HOSTEL, DEPARTMENT, CLUB } = require("../utils/constants");

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  hostel: {
    type: String,
    enum: HOSTEL,
    required: true,
  },
  clubs: {
    type: [String],
    enum: CLUB,
    required: true,
  },
  department: {
    type: String,
    enum: DEPARTMENT,
    required: true,
  },
  batch: {
    type: Number,
    enum: [2018, 2019, 2020, 2021, 2022, 2023, 2024],
    required: true,
  },
  image: {
    type: String,
  },
});
userSchema.plugin(passLocalMongoose);

const User = mongoose.model("User", userSchema);
module.exports = User;
