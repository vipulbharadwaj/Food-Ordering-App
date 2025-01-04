const express = require("express");
const {addFood, getFood, removeFood} = require("../controllers/foodController");
const multer = require("multer");

const foodRouter = express.Router();

// Image Storage
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`);
    }
});

const upload = multer({ storage: storage }).single("image");

foodRouter.post("/add", upload, addFood);
foodRouter.get("/list",getFood);
foodRouter.post("/remove", removeFood);

module.exports = foodRouter;
