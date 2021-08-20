const mongoose = require("mongoose");
const { HOSTEL, DEPARTMENT, CLUB } = require("../utils/constants");

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  hostel: {
    type: String,
    enum: HOSTEL,
  },
  clubs: {
    type: [String],
    enum: CLUB,
  },
  department: {
    type: String,
    enum: DEPARTMENT,
  },
  batch: {
    type: Number,
    enum: [2018, 2019, 2020, 2021, 2022, 2023, 2024],
  },
  image: {
    url: String,
    filename: String
  },
  email: {
    type: String,
  },
  username: {
    type: String,
  },
  outlook_id: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
