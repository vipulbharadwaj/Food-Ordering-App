const express = require("express");
const { signinUser, signupUser } = require("../controllers/userController");

const userRouter = express.Router();

userRouter.post("/register", signupUser);
userRouter.post("/login", signinUser);

module.exports = userRouter;