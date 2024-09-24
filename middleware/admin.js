require("dotenv").config();
const jwt = require("jsonwebtoken");
const adminSecret = process.env.JWT_ADMIN_SECRET;

function adminAuthMiddlewere(req, res, next) {
    const adminToken = req.headers.authorization;
    const response = jwt.verify(adminToken, adminSecret);
    console.log(response);
  
    if (response) {
      req.adminId = response.id;
      next();
    } else {
      res.status(403).json({
        message: "not authorized",
      });
    }
  }

module.exports = adminAuthMiddlewere;