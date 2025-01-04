const express = require("express");
const cors = require("cors");
const connectDb = require("./utils/db");
const foodRouter = require("./routes/foodRoutes");
const userRouter = require("./routes/userRoute");
const cartRouter = require("./routes/cartRoute");
const orderRouter = require("./routes/orderRoute");

//APP CONFIG
const app = express();

//MIDDLEWARRE
app.use(express.json());
app.use(cors());

//API
app.use("/api/food", foodRouter);
app.use("/api/user",userRouter);
app.use("/images", express.static('uploads'));
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get("/", (req, res) => {
  res.send("Hello World");
});

const PORT = 4000;
connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
