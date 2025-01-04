require("dotenv").config();
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");

//SIGN IN
const signinUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = createToken(user._id);
    res.status(200).json({
      message: "Login Successful",
      user: { email, password },
      token,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

//SIGNUP USER
const signupUser = async (req, res) => {
  const { name, email, password, phone } = req.body;
  try {
    //checking if user already exists
    const userExists = await userModel.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    //validating email
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Please Provide Valid Email" });
    }
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name: name,
      email: email,
      password: hashedPassword,
      phone: phone,
    });

    const user = await newUser.save();
    const token = createToken(user._id);
    res.status(201).json({
      message: "User registered successfully",
      user: { name, email, phone },
      token,
      userId: newUser._id.toString(),
    });
    console.log(user)
    //res.status(201).json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { signinUser, signupUser };
