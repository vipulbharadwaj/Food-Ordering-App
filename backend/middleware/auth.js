require("dotenv").config();
const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  try {
    const { token } = req.headers;

    if (!token) {
      return res.status(401).send('Access denied. No Token Provided.');
    }
    console.log("Received token:", token);

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = decoded.id;

    next();
  } catch (error) {
    console.error("JWT Error:", error);
    return res.status(401).send('Access denied. Please Login!');
  }
};

module.exports = authMiddleware;
