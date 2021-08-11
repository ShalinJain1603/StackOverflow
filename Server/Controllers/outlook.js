const User = require("../models/user");
const passport = require("passport");

module.exports.addUser = async (req, res) => {
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
};

module.exports.signinUser = passport.authenticate("windowslive", {
  scope: [
    "openid",
    "profile",
    "offline_access",
    "https://outlook.office.com/Mail.Read",
  ],
});
