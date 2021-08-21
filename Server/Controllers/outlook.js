const User = require("../models/user");
const passport = require("passport");
const { LETTERHEADS } = require("../utils/constants");
module.exports.loginUser = async (req, res) => {
  const foundUser = await User.findOne({ outlook_id: req.user.id });
  if (!foundUser) {
    res.redirect("http://localhost:3000/register");
  } else {
    res.redirect("http://localhost:3000/");
  }
};

module.exports.signinUser = passport.authenticate("windowslive", {
  scope: [
    "openid",
    "profile",
    "offline_access",
    "https://outlook.office.com/Mail.Read",
  ],
});

module.exports.registerUser = async (req, res) => {
  const foundUser = await User.findOne({ outlook_id: req.user.id });
  if (!foundUser) {
    const user = new User(req.body);
    user.outlook_id = req.user.id;
    user.email = req.user.emails[0].value;
    user.username = req.user.displayName;
    const head = req.user.displayName[0];
    user.image.url = LETTERHEADS[head];
    await user.save();
    res.send("User registered");
  } else {
    res.send("User already registered once");
  }
};
