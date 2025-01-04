require("dotenv").config();
const orderModel = require("../models/orderModel");
const userModel = require("../models/userModel");
const Stripe = require("stripe");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrder = async (req, res) => {
  const frontend_url = "http://localhost:5173";

  try {
    // Create a new order
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });
    await newOrder.save();

    // Clear the user's cart after placing the order
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    // Prepare line items for Stripe checkout
    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "INR",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100, // Amount in paisa (1 INR = 100 paisa)
      },
      quantity: item.quantity,
    }));

    // Add delivery charges as a line item
    line_items.push({
      price_data: {
        currency: "INR",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 60 * 100, // Delivery charge in paisa
      },
      quantity: 1,
    });

    // Create a Stripe session
    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: 'payment',
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    // Return the session URL to the frontend
    res.json({ success: true, session_url: session.url });

  } catch (error) {
    console.error("Error in placeOrder:", error);
    res.json({ success: false, message: "Failed to place order" });
  }
};

const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res.json({ success: true, message: "Payment successful" });
    } else {
      await orderModel.findByIdAndUpdate(orderId, { payment: false });
      res.json({ success: false, message: "Payment failed" });
    }
  } catch (error) {
    console.error("Error in verifyOrder:", error);
    res.json({ success: false, message: "Error in verifying order" });
  }
};

//users order client side
const userOrders = async(req, res)=>{
  try {
    const orders = await orderModel.find({userId:req.body.userId});
    res.json({success:true, data: orders});

  } catch (error) {
    console.error("Error in userOrders:", error);
    res.json({ success: false, message: "Error in fetching user orders" });
  }
};

// listig orders for amdin panel
const listOrders = async(req, res)=>{
  try {
    const orders = await orderModel.find({});
    res.json({success:true, data: orders});
  } catch (error) {
    console.error("Error in listOrders:", error);
    res.json({ success: false, message: "Error in fetching orders" });
    
  }
};

//updating order status
const updateStatus = async(req, res)=>{
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, {status: req.body.status});
    res.json({success:true, message: "Order status updated" });
  } catch (error) {
    console.error("Error in updateStatus:", error);
    res.json({ success: false, message: "Error in updating order status" });
  }
}

module.exports = { placeOrder, verifyOrder, userOrders, listOrders, updateStatus};
