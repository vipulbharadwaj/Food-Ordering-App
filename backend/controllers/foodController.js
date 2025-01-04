const foodModel = require("../models/foodModel");
const fs = require("fs");

//adding food
const addFood = async (req, res) => {
  if (!req.file) {
    return res
      .status(400)
      .json({ success: false, message: "No file uploaded" });
  }

  //const image_filename = req.file.filename;
  const imageUrl = `${req.file.filename}`

  const { name, description, price, category } = req.body;

  if (!name || !description || !price || !category) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  const food = new foodModel({
    name,
    description,
    price,
    category,
    image: imageUrl,
  });

  try {
    await food.save();
    res.status(201).json({ success: true, message: "Successfully Added" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Some Error Occurred" });
  }
};

// food list
const getFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error occured in getting food items",
    });
  }
};

//removing food
const removeFood = async (req, res) => {
  const id = req.body.id;

  if (!id) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide id to remove" });
  }

  try {
    const food = await foodModel.findById(id);
    if (!food) {
      return res
        .status(404)
        .json({ success: false, message: "Food item not found" });
    }
    fs.unlink(`uploads/${food.image}`, () => {});
    await foodModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Successfully Removed food item" });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error occured in removing food item",
    });
  }
};

module.exports = { addFood, getFood, removeFood };
