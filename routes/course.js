const express = require("express");
const router = express.Router({ mergeParams: true });

const { courseModel, purchaseModel } = require("../db");

const userAuthMiddlewere = require("../middleware/user");

router.post("/purchases", userAuthMiddlewere, async (req, res) => {
  const userId = req.userId;
  try {
    const courseId = req.body.courseId;
    console.log("userId :",userId);
    console.log("courseId :",courseId);

    if (userId) {
      await purchaseModel.create({
        courseId: courseId,
        userId: userId,
      });
      res.json({
        message: "course purchased successfully",
      })
    } else {
      res.json({
        message: "validation error",
      });
    }
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
});

router.get("/preview", userAuthMiddlewere, async (req, res) => {
  const userId = req.userId;
  if (userId) {
    const courses = await courseModel.find();
    res.json({
      // courses: courses,
      message: "get all courses",
    });
  } else {
    res.json({
      message: "validation error",
    });
  }
});

module.exports = router;
