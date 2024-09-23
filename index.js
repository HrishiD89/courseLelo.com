const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const { userModel, adminModel, courseModel, purchaseModel } = require("./db");

const userRouter = require("./routes/user");
const courseRouter = require("./routes/course");
const adminRouter = require("./routes/admin");

const app = express();
app.use(express.json());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/course", courseRouter);

console.log("afa");

app.listen(3000, () => {
  console.log(`Server is listening to PORT : 3000`);
});
