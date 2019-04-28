const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to our app :)"
  });
});

app.listen(PORT, () => {
  console.log(`server is running on PORT ${PORT}`);
});
