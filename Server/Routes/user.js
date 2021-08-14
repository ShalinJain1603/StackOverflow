const express = require("express");
const {
  userDetails,
  editDetails,
  deleteAccount,
} = require("../Controllers/user");
const router = express.Router();

const isLoggedIn = require("../utils/isLoggedIn");

router.get("/", isLoggedIn, userDetails);
router.post("/edit", isLoggedIn, editDetails);
router.post("/delete", isLoggedIn, deleteAccount);

module.exports = router;
