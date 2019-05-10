const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("./model/User");

const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = "SECRET";

module.exports = passport => {
  passport.use(
    new JwtStrategy(options, (payload, done) => {
      User.findOne({ _id: payload._id })
        .then(user => {
          if (!user) {
            return done(null, false);
          } else {
            return done(null, user);
          }
        })
        .catch(err => {
          console.log(err);
          return done(err);
        });
    })
  );
};
