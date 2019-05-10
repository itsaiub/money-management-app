const router = require("express").Router();
const {
  create,
  getAll,
  getSingleTransaction,
  update,
  remove
} = require("../controllers/transactionController");

router.get("/", getAll);

router.post("/", create);

router.get("/:transactionId", getSingleTransaction);

router.put("/:transactionId", update);

router.delete("/:transactionId", remove);

module.exports = router;
