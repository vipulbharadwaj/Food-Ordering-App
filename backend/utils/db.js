const mongoose = require("mongoose");
const URI = "mongodb+srv://foodorder:Foodorder88@cluster2.9gzvf56.mongodb.net/food-order?retryWrites=true&w=majority&appName=Cluster2";

const connectDb = async (req, res) => {
    try {
        await mongoose.connect(URI);
        console.log("Connected Successfully to Database");
    } catch (error) {
        console.log("Error Conncting to the Database");
        process.exit(1);
    }
}

module.exports = connectDb;
