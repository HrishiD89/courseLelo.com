const express = require('express');
const router = express.Router({ mergeParams: true })


router.post("/login", (req, res) => {
  res.json({
    message: "login endpoint",
  });
});
router.post("/signup", (req, res) => {
  res.json({
    message: "signup endpoint",
  });
});

router.get("/purchases", (req, res) => {
  res.json({
    message: "my courses",
  });
}); //my course

module.exports = router;