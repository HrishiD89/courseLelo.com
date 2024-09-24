const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");


const userRouter = require("./routes/user");
const courseRouter = require("./routes/course");
const adminRouter = require("./routes/admin");

const app = express();
app.use(express.json());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/course", courseRouter);


async function main() {
    try {
        await mongoose.connect(process.env.MONGO_STRING);
        app.listen(3000, () => {
            console.log("server started at port 3000");
          });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log('Error connecting to MongoDB:', error);
        console.error('Error details:', error);

    }
}
main();