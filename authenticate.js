const passport = require("passport");

module.exports = (req, res, next) => {
  passport.authenticate("jwt", (err, user, info) => {
    if (err) {
      console.log(info, err);
      return next(err);
    }
    if (!user) {
      return res.status(400).json({
        message: "authentication failed."
      });
    }
    req.user = user;
    return next();
  })(req, res, next);
};