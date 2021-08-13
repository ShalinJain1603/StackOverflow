const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.send("You must login first");
};

module.exports = isLoggedIn;
