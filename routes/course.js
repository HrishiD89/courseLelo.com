const express = require("express");
const router = express.Router({ mergeParams: true })

router.post("/purchases", (req, res) => {
  res.json({
    message: "puchase course",
  });
}); //my course

router.get("/preview", (req, res) => {
  res.json({
    message: "get all courses",
  });
});

module.exports = router;
