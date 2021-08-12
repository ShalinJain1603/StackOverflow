const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.send("You must login to add a new question");
};

module.exports = isLoggedIn;
