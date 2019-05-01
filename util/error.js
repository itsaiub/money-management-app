module.exports = {
  catchServerError(res, error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error occurred"
    });
  },
  catchResourceError(res, message) {
    return res.status(400).json({
      message
    });
  }
};
