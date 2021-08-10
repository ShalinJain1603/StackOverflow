const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");

router.get(
  "/auth/outlook",
  passport.authenticate("windowslive", {
    scope: [
      "openid",
      "profile",
      "offline_access",
      "https://outlook.office.com/Mail.Read",
    ],
  }),
  (req, res) => {}
);

router.get(
  "/auth/outlook/callback",
  passport.authenticate("windowslive", { failureRedirect: "/" }),
  async (req, res) => {
    const foundUser = await User.findOne({ outlook_id: req.user.id });
    if (!foundUser) {
      const newUser = new User({
        outlook_id: req.user.id,
        email: req.user.emails[0].value,
        username: req.user.displayName,
      });
      await newUser.save();
    }
    res.redirect("/demo");
  }
);

router.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});

module.exports = router;
