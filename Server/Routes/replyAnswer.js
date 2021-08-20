const express = require("express");
const router = express.Router();
const isLoggedIn = require("../utils/isLoggedIn");
const isAuthorReply = require("../utils/isAuthorReply");
const {
  addReply,
  deleteReply,
  addVote,
} = require("../Controllers/replyAnswer");
router.post("/:id/answer/:answerId/reply", isLoggedIn, addReply);
router.post(
  "/:id/answer/:answerId/reply/:replyId",
  isLoggedIn,
  isAuthorReply,
  deleteReply
);

router.post(
  "/:id/answer/:answerId/reply/:replyId/addVote",
  isLoggedIn,
  addVote
);

router.get(
  "/:id/answer/:answerId/reply/:replyId/isValid",
  isLoggedIn,
  isAuthorReply,
  (req, res) => {
    res.send("Allowed");
  }
);
module.exports = router;
