exports.verifyLogin = (req, res, next) => {
  if (req.session.loggedIn) {
    req.user = req.session.user;
    next();
  } else {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
