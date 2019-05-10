const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const passport = require("passport");
const userRouter = require("./routers/userRoute");
const transactionRouter = require("./routers/transactionRoute");

const app = express();
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());
require("./passport")(passport);

const PORT = process.env.PORT || 4000;

app.use("/api/users/", userRouter);
app.use("/api/transactions", transactionRouter);

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to our app :)"
  });
});

app.listen(PORT, () => {
  console.log(`server is running on PORT ${PORT}`);
  mongoose.connect(
    "mongodb://localhost/money-management-app",
    { useNewUrlParser: true },
    () => {
      console.log("database connected");
    }
  );
});
