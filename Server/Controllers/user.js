const User = require("../models/user");
const { cloudinary } = require("../cloudinary");

module.exports.userDetails = async (req, res) => {
  const foundUser = await User.findOne({ outlook_id: req.user.id });
  res.json(foundUser);
};

module.exports.editDetails = async (req, res) => {
  const user = await User.findOne({ outlook_id: req.user.id });
  user.firstname = req.firstname;
  user.lastname = req.lastname;
  user.batch = req.batch;
  user.hostel = req.hostel;
  user.department = req.department;
  if (req.file) {
    if (user.image.filename) {
      cloudinary.uploader.destroy(user.image.filename);
    }
    user.image.url = req.file.path;
    user.image.filename = req.file.filename;
  }

  user.save();
  console.log(user.image.url);
  // await User.findOneAndUpdate({ outlook_id: req.user.id }, req.body);
  res.send("User edited successfully");
};

module.exports.deleteAccount = async (req, res) => {
  await User.findOneAndDelete({ outlook_id: req.user.id });
  req.logout();
  res.send("User deleted successfully");
};
