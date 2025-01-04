const userModel = require("../models/userModel");

const addToCart = async (req, res) => {
    try {
        // Find the user data
        let userData = await userModel.findById(req.body.userId );
        let cartData = userData.cartData;

        // Check if item already exists in the cart
        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1; // Add item to cart if it doesn't exist
        } else {
            cartData[req.body.itemId] +=1; // Increment the item count if it exists
        }

        // Update user cartData
        await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        res.status(200).json({ message: "Item added to cart successfully" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error adding item to cart" });
    }
}



const removeFromCart = async(req, res)=>{
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = userData.cartData;
        if(cartData[req.body.itemId]>0){
            cartData[req.body.itemId]--;
        }

        await userModel.findByIdAndUpdate(req.body.userId, {cartData});
        res.status(200).json({message: "Item removed from cart successfully"});

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error removing item from cart"});
    }
}

const deleteFromCart = async(req, res)=>{
    try {
        const userData = await userModel.findById(req.body.userId);
        const cartData = userData.cartData;
        delete cartData[req.body.itemId];
        await userModel.findByIdAndUpdate(req.body.userId, {cartData});
        res.status(200).json({message: "Item deleted from cart successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error deleting item from cart"});
    }
}

const getCart = async(req, res)=>{
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = userData.cartData;
        res.status(200).json({cartData});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error fetching cart"});
    }

}

module.exports={addToCart, removeFromCart, getCart, deleteFromCart};