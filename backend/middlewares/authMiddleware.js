// Backend/middleware/authenticate.js

const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const authenticate = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = decodedToken.userId;
    next();
  } catch (error) {
    res.status(401).send({
      message: "You are not authenticated",
      data: error,
      success: false,
    });
  }
};

module.exports = authenticate;
