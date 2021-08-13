const express = require("express");
const router = express.Router();
const passport = require("passport");
const isLoggedIn = require("../utils/isLoggedIn");
const {
  loginUser,
  signinUser,
  registerUser,
} = require("../Controllers/outlook");

router.get("/auth/outlook", signinUser, (req, res) => {
  res.send("Successfully Signed In!!");
});

router.get(
  "/auth/outlook/callback",
  passport.authenticate("windowslive", { failureRedirect: "/" }),
  loginUser
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("http://localhost:3000/");
});

router.get("/isLoggedIn", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ loggedIn: true });
  } else {
    res.json({ loggedIn: false });
  }
});

router.post("/registerUser", isLoggedIn, registerUser);

module.exports = router;
