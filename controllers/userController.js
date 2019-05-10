const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const registerValidator = require("../validator/registerValidator");
const loginValidator = require("../validator/loginValidator");
const User = require("../model/User");
const { catchServerError, catchResourceError } = require("../util/error");

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
            return catchResourceError(res, "Email already exits");
          }

          bcrypt.hash(password, 11, (err, hash) => {
            if (err) {
              catchServerError(res, err);
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
              .catch(err => catchServerError(res, err));
          });
        })
        .catch(err => catchServerError(res, err));
    }
  },

  login(req, res) {
    let { email, password } = req.body;

    let validate = loginValidator({ email, password });
    if (!validate.isValid) {
      return res.status(400).json(validate.error);
    }
    User.findOne({ email })
      //Todo: use populate for transaction
      .then(user => {
        if (!user) {
          return catchResourceError(res, "User not found");
        }
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) {
            return catchServerError(res, err);
          }
          if (!result) {
            return catchResourceError(res, "Password doesn't match");
            // catchResourceError(res, "Password doesn't match");
          }
          let token = jwt.sign(
            {
              _id: user._id,
              name: user.name,
              email: user.email,
              amount: user.amount,
              income: user.income,
              expense: user.expense,
              transactions: user.transactions
            },
            "SECRET",
            { expiresIn: "2h" }
          );

          return res.status(200).json({
            message: "Login Successful",
            token: `Bearer${token}`
          });
        });
      })
      .catch(err => catchServerError(res, error));
  }
};
