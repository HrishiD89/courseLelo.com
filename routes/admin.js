const { Router } = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const adminAuthMiddlewere = require("../middleware/admin");


const { adminModel, courseModel } = require("../db");


const adminSecret = process.env.JWT_ADMIN_SECRET;

const adminRouter = Router();

adminRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const admin = await adminModel.findOne({ email, password });

  if (!admin) {
    res.status(403).json({
      message: "Incorrect credentials",
    });
  } else {
    // cookie based auth in future
    const adminToken = jwt.sign(
      {
        id: admin._id.toString(),
      },
      adminSecret
    );
    res.json({
      adminToken,
      message: "admin login",
    });
  }
});

adminRouter.post("/signup", async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    await adminModel.create({
      email,
      password,
      firstName,
      lastName,
    });
    res.json({
      message: "admin login",
    });
  } catch (error) {
    res.status(403).json({
      message: "validation error",
    });
  }
});

// function adminAuthMiddlewere(req, res, next) {
//   const adminToken = req.headers.authorization;
//   const response = jwt.verify(adminToken, adminSecret);
//   console.log(response);

//   if (response) {
//     req.adminId = response.id;
//     next();
//   } else {
//     res.status(403).json({
//       message: "not authorized",
//     });
//   }
// }

adminRouter.post("/course", adminAuthMiddlewere, async (req, res) => {
  const adminId = req.adminId;
  try {
    const { title, description, price, imageUrl } = req.body;

    if (adminId) {
      const course = await courseModel.create({
        title,
        description,
        price,
        imageUrl,
        creatorId: adminId,
      });
      res.json({
        courseId: course._id,
        message: "Course created successfully",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(403).json({
      message: "validation error",
    });
  }
});

adminRouter.put("/course", adminAuthMiddlewere, async (req, res) => {
  const adminId = req.adminId;
  const courseId = req.headers.courseid;

  try {
    const { title, description, price, imageUrl } = req.body;
    if (adminId) {
      const updatedCourse = await courseModel.findOneAndUpdate(
        { _id: courseId, creatorId: adminId },
        {
          title,
          description,
          price,
          imageUrl,
        },
        { new: true }
      );
      if (!updatedCourse) {
        res.status(403).json({ message: "course not found" });
      } else {
        res.json({
          message: "course updated successfully",
        });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(403).json({
      message: "validation error",
    });
  }
});

adminRouter.delete("/course", adminAuthMiddlewere, async (req, res) => {
  const adminId = req.adminId;
  const courseId = req.headers.courseid;

  try {
    if (adminId) {
      const deleteCourse = await courseModel.findOneAndDelete({
        _id: courseId,
        creatorId: adminId,
      });

      if (!deleteCourse) {
        res.json({
          message: "course not found",
        });
      } else {
        res.json({
          message: "Course deleted successfully",
        });
      }
    }
  } catch (error) {
    console.error(error);
    res.json({
      message: "validation error",
    });
  }
});

adminRouter.get("/course/bulk",adminAuthMiddlewere,async (req, res) => {
    const adminId = req.adminId;
    try {
        const response = await courseModel.find({
            creatorId : adminId
        })
        if(response.length === 0){
            res.json({message : "No course found"})
        }else{
            res.json({
                message : "Hooray!, your courses are fetched succesfully",
                courses : response
            })
        }
    } catch (error) {
        console.error(error);
        res.json({
            message:"validation error",
        })
    }


});

module.exports = adminRouter;
