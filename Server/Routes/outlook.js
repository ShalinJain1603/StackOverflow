const express = require("express");
const router = express.Router();
const passport = require("passport");
const { addUser, signinUser } = require("../Controllers/outlook");

router.get("/auth/outlook", signinUser, (req, res) => {});

router.get(
  "/auth/outlook/callback",
  passport.authenticate("windowslive", { failureRedirect: "/" }),
  addUser
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

router.get("/isLoggedIn", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ loggedIn: true });
  } else {
    res.json({ loggedIn: false });
  }
});
module.exports = router;
