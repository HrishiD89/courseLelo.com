require("dotenv").config();
const jwt = require("jsonwebtoken");
const userSecret = process.env.JWT_USER_SECRET;

function userAuthMiddlewere(req, res, next) {
    const usertoken = req.headers.authorization;
    const response = jwt.verify(usertoken,userSecret);
    console.log(response);

    if (response) {
      req.userId = response.id;
      next();
    } else {
      res.status(403).json({
        message: "unauthorized",
      });
    }
  }


module.exports = userAuthMiddlewere;