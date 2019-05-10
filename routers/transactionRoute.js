const router = require("express").Router();
const {
  create,
  getAll,
  getSingleTransaction,
  update,
  remove
} = require("../controllers/transactionController");
const authenticate = require("../authenticate");

router.get("/", authenticate, getAll);

router.post("/", authenticate, create);

router.get("/:transactionId", getSingleTransaction);

router.put("/:transactionId", update);

router.delete("/:transactionId", remove);

module.exports = router;
