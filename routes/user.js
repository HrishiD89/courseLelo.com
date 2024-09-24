const express = require("express");
const router = express.Router({ mergeParams: true });

require("dotenv").config();
const jwt = require("jsonwebtoken");
const userSecret = process.env.JWT_USER_SECRET;

const { userModel, purchaseModel } = require("../db");

function userAuthMiddlewere(req, res, next) {
  const usertoken = req.headers.authorization;
  const response = jwt.verify(usertoken,userSecret);
  if (response) {
    req.userId = response.userId;
    next();
  } else {
    res.status(403).json({
      message: "unauthorized",
    });
  }
}
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
  
  const user = await userModel.findOne({email,password});

  if(!user){
    res.status(403).json({
      message : "Incorrect credentials",
    })
  }else{
      const usertoken = jwt.sign({
        id:user._id.toString(),
      },userSecret);
  
      res.json({
        usertoken,
        message : "You are successfully logged in"
      })
  }
});

router.get("/purchases", userAuthMiddlewere, (req, res) => {
  res.json({
    message: "my courses",
  });
}); //my course

module.exports = router;
