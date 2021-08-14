const express = require("express");
const router = express.Router();
const isLoggedIn = require("../utils/isLoggedIn");
const isAuthorReply = require("../utils/isAuthorReply");
const { addReply, deleteReply } = require("../Controllers/replyAnswer");
router.post("/:id/answer/:answerId/reply", isLoggedIn, addReply);
router.post(
  "/:id/answer/:answerId/reply/:replyId",
  isLoggedIn,
  isAuthorReply,
  deleteReply
);

module.exports = router;
