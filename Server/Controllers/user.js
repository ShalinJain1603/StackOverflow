const User = require("../models/user");
const { cloudinary } = require("../cloudinary");

module.exports.userDetails = async (req, res) => {
  const foundUser = await User.findOne({ outlook_id: req.user.id });
  res.json(foundUser);
};

module.exports.editDetails = async (req, res) => {
  const user = await User.findOne({ outlook_id: req.user.id });
  user.firstname = req.body.firstname;
  user.lastname = req.body.lastname;
  user.batch = req.body.batch;
  user.hostel = req.body.hostel;
  user.department = req.body.department;
  if (req.file) {
    if (user.image.filename) {
      cloudinary.uploader.destroy(user.image.filename);
    }
    user.image.url = req.file.path;
    user.image.filename = req.file.filename;
  }

  user.save();
  res.send("User edited successfully");
};

module.exports.deleteAccount = async (req, res) => {
  await User.findOneAndDelete({ outlook_id: req.user.id });
  req.logout();
  res.send("User deleted successfully");
};
