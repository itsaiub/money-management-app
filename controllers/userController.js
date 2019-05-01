const bcrypt = require("bcrypt");
const registerValidator = require("../validator/registerValidator");
const User = require("../model/User");

// login controller

module.exports = {
  register(req, res) {
    let { name, email, password, confirmPassword } = req.body;
    let validate = registerValidator({
      name,
      email,
      password,
      confirmPassword
    });

    if (!validate.isValid) {
      return res.status(400).json(validate.error);
    } else {
      User.findOne({ email })
        .then(user => {
          if (user) {
            return res.status(400).json({
              message: "Email already exits"
            });
          }

          bcrypt.hash(password, 11, (err, hash) => {
            if (err) {
              return res.status(500).json({
                message: "Server error"
              });
            }
            let user = new User({
              name,
              email,
              password: hash
            });
            user
              .save()
              .then(user => {
                return res.status(201).json({
                  message: "User created successfully",
                  user
                });
              })
              .catch(err => {
                return res.status(500).json({
                  message: "Server error occurred."
                });
              });
          });
        })
        .catch(err => {
          res.status(500).json({
            message: "Server error occurred."
          });
        });
    }
  },

  login(req, res) {
    let name = req.body.name;
    let email = req.body.password;

    res.json({
      hee: req.body,
      message: "hello " + name + " " + email
    });
  }
};
