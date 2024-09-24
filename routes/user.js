const express = require("express");
const router = express.Router({ mergeParams: true });

require("dotenv").config();
const jwt = require("jsonwebtoken");
const userSecret = process.env.JWT_USER_SECRET;

const { userModel, purchaseModel } = require("../db");

const userAuthMiddlewere = require("../middleware/user");

router.post("/signup", async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    await userModel.create({
      email,
      password,
      firstName,
      lastName,
    });

    res.json({
      message: "You are signed up",
      yourdetail: {
        email,
        password,
        firstName,
        lastName,
      },
    });
  } catch (err) {
    res.status(403).json({
      message: "Validation error",
      errors: err.errors,
    });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email, password });

  if (!user) {
    res.status(403).json({
      message: "Incorrect credentials",
    });
  } else {
    const usertoken = jwt.sign(
      {
        id: user._id.toString(),
      },
      userSecret
    );

    res.json({
      usertoken,
      message: "You are successfully logged in",
    });
  }
});

router.get("/purchases", userAuthMiddlewere, async (req, res) => {
  const userId = req.userId;
  console.log("userId :",userId);
  try {
    if (!userId) {
      res.json({
        message: "Validation Error",
      });
    } else {
      const myCourses = await purchaseModel
        .find({
          userId: userId,
        })
        .populate(["userId", "courseId"])
        .exec();


      console.log("My courses :");
      myCourses.forEach((course,idx)=>{
        console.log(`course ${idx+1} :`,course.courseId.title);
      })

      res.json({
        myCourses,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      message: "Something went wrong!"
    });
  }
});

module.exports = router;
