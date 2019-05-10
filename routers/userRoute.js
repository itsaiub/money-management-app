const router = require("express").Router();
const { register, login, allUser } = require("../controllers/userController");

// Registation Route
router.post("/register", register);

router.post("/login", login);

router.get("/all", allUser);

module.exports = router;
