const User = require("../models/user");

module.exports.userDetails = async (req, res) => {
  const foundUser = await User.findOne({ outlook_id: req.user.id });
  res.json(foundUser);
};

module.exports.editDetails = async (req, res) => {
  await User.findOneAndUpdate({ outlook_id: req.user.id }, req.body);
  res.send("User edited successfully");
};

module.exports.deleteAccount = async (req, res) => {
  await User.findOneAndDelete({ outlook_id: req.user.id });
  req.logout();
  res.send("User deleted successfully");
};
