const express = require("express");
const router = express.Router();
const isLoggedIn = require("../utils/isLoggedIn");
const isAuthor = require("../utils/isAuthor");

const {
  showAllQuestions,
  addQuestion,
  editQuestion,
  deleteQuestion,
  showOneQuestion,
  showByTags,
  addVote,
  resolveQuestion,
} = require("../Controllers/question");

router.get("/", showAllQuestions);
router.post("/new", isLoggedIn, addQuestion);
router.post("/tags", showByTags);
router.get("/:id", showOneQuestion);
router.post("/:id/edit", isLoggedIn, isAuthor, editQuestion);
router.post("/:id/delete", isLoggedIn, isAuthor, deleteQuestion);
router.post("/:id/vote", isLoggedIn, addVote);
router.post("/:id/resolve", isLoggedIn, isAuthor, resolveQuestion);
module.exports = router;
