const express = require("express");
require("express-async-errors");
const cors = require("cors");
const mongoose = require("mongoose");
const userRouter = require("./routes/user.js");
const jobRouter = require("./routes/job.js");
const adminRouter = require("./routes/admin.js");
const homeRouter = require("./routes/home.js");
const nodemailer = require("nodemailer");

const app = express();
require("dotenv").config();
const port = 8000;
app.use(
  express.urlencoded({
    extended: true,
  })
);

const mongoUrl = process.env.MONGO_URI;
mongoose
  .connect(mongoUrl)
  .then(() => {
    app.listen(port, () => console.log(`Server is listening on port ${port}!`));
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use(cors());

app.use("/user", userRouter);
app.use("/jobs", jobRouter);
app.use("/admin", adminRouter);
app.use("/home", homeRouter);

app.get("/", (req, res) => {
  res.send(`Heyy`);
});
