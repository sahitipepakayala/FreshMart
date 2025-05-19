const express = require("express");
const orderRouter = express.Router();
const { Order } = require("../models/orders");
const {User} =require("../models/users")

// POST /api/orders/place
orderRouter.post("/place", async (req, res) => {
  const { buyer,buyerName, price, address, number } = req.body;

  // Check for missing fields
  if (!buyer || !price || !address || !number) {
    return res.status(400).json({ error: "All fields are required." });
  }
  const user = await User.findById(buyer);


  try {
    const newOrder = new Order({
      buyer,
      buyerName,
      price,
      address,
      number,
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error("Order placement failed:", error);
    res.status(500).json({ error: error.message || "Failed to place order" });
  }
});

orderRouter.get("/myOrders/:id",async(req,res)=>{
  const {id}=req.params;
  try{
    const orders = await Order.find({ buyer: id })

    if (!orders || orders.length === 0) {
      return res.status(404).send("No orders found for this user.");
    }
    res.send(orders);

  }
  catch(error){
    console.log(error);
    return res.status(500).send("Error in retrieving the orders")
  }
})

orderRouter.get("/allOrders",async(req,res)=>{
  try{
    const orders=await Order.find();
    if(orders.length===0)
      return res.status(500).send("No orders found!");
    res.send(orders)
  }
  catch(error){
    console.log(error);
    res.status(500).send("error in retrieving all ordersh")
  }
})

// Update order status
orderRouter.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedOrder) return res.status(404).send('Order not found');
    res.send(updatedOrder);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error updating order status');
  }
});

module.exports = { orderRouter };
