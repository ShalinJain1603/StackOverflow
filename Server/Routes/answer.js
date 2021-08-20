const express = require("express");
const router = express.Router();
const isLoggedIn = require("../utils/isLoggedIn");
const isAuthorAnswer = require("../utils/isAuthorAnswer");

const {
  addAnswer,
  deleteAnswer,
  addVoteToAnswer,
} = require("../Controllers/answer");
router.post("/:id/answer", isLoggedIn, addAnswer);
router.post("/:id/answer/:answerId", isLoggedIn, isAuthorAnswer, deleteAnswer);
router.post("/:id/answer/:answerId/addVote", isLoggedIn, addVoteToAnswer);
router.get(
  "/:id/answer/:answerId/isValid",
  isLoggedIn,
  isAuthorAnswer,
  (req, res) => {
    res.send("Allowed");
  }
);
module.exports = router;
