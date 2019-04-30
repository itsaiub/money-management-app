const router = require("express").Router();
const { register, login } = require("../controllers/userController");

// Registation Route
router.post("/register", register);

router.post("/login", login);

module.exports = router;
