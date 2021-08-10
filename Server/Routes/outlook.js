const express = require("express");
const router = express.Router();
const passport = require("passport");

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
  function (req, res) {
    console.log(req.user);
    res.redirect("/demo");
  }
);

router.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});

module.exports = router;
