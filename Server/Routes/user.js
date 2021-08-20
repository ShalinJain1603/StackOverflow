const express = require("express");
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });
const {
  userDetails,
  editDetails,
  deleteAccount,
} = require("../Controllers/user");
const router = express.Router();

const isLoggedIn = require("../utils/isLoggedIn");

router.get("/", isLoggedIn, userDetails);
router.post("/edit", isLoggedIn, upload.single("image"), editDetails);
router.post("/delete", isLoggedIn, deleteAccount);

module.exports = router;
