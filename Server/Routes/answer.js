const express = require("express");
const router = express.Router();
const isLoggedIn = require("../utils/isLoggedIn");
const isAuthorAnswer = require("../utils/isAuthorAnswer");
const { addAnswer, deleteAnswer } = require("../Controllers/answer");
router.post("/:id/answer", isLoggedIn, addAnswer);
router.post("/:id/answer/:answerId", isLoggedIn, isAuthorAnswer, deleteAnswer);

module.exports = router;
