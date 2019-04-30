const registerValidator = require("../validator/registerValidator");

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
      res.status(400).json(validate.error);
    } else {
      res.status(200).json({
        message: "everything is okay"
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
