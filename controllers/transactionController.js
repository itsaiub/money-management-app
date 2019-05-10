const Transaction = require("../model/Transaction");
const User = require("../model/User");
const { catchServerError } = require("../util/error");

module.exports = {
  create(req, res) {
    let { amount, note, type } = req.body;
    let userId = req.user._id;

    let transaction = new Transaction({
      amount,
      type,
      note,
      author: userId
    });

    transaction
      .save()
      .then(trans => {
        let updatedUser = { ...req.user._doc };
        if (type === "income") {
          (updatedUser.balance = updatedUser.balance + amount),
            (updatedUser.income = updatedUser.income + amount);
        } else if (type === "expense") {
          (updatedUser.balance = updatedUser.balance - amount),
            (updatedUser.expense = updatedUser.expense + amount);
        }
        updatedUser.transactions.unshift(trans._id);
        User.findByIdAndUpdate(
          updatedUser._id,
          { $set: updatedUser },
          { new: true }
        )
          .then(result => {
            res.status(201).json({
              message: "Trasacton created successfully",
              ...trans._doc,
              user: result
            });
          })
          .catch(err => catchServerError(res, err));
      })
      .catch(err => catchServerError(res, err));
  },

  getAll(req, res) {
    Transaction.find()
      .then(transactions => {
        if (transactions.length === 0) {
          return res.status(204).json({
            message: "No transaction found."
          });
        } else {
          return res.status(200).json(transactions);
        }
      })
      .catch(err => catchServerError(res, err));
  },

  getSingleTransaction(req, res) {
    let { transactionId } = req.params;
    Transaction.findById(transactionId)
      .then(transaction => {
        if (!transaction) {
          return res.status(204).json({
            message: "No transaction found."
          });
        } else {
          return res.status(200).json(transaction);
        }
      })
      .catch(err => catchServerError(res, err));
  },

  update(req, res) {
    let { transactionId } = req.params;
    User.findByIdAndUpdate(transactionId, { $set: req.body })
      .then(result => {
        return res.status(200).json({
          message: "Updated successfully.",
          ...result
        });
      })
      .catch(err => catchServerError(res, err));
  },
  remove(req, res) {
    let { transactionId } = req.params;
    User.findByIdAndRemove(transactionId)
      .then(result => {
        return res.status(200).json({
          message: "Deleted successfully.",
          ...result
        });
      })
      .then(err => catchServerError(res, err));
  }
};
