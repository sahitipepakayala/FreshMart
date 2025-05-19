const mongoose=require("mongoose");
const validator = require("validator");
const { User } = require("./users");

const orderSchema = new mongoose.Schema({
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  buyerName: {
    type: String,
    required: true  // since we'll now save it during order placement
  },
  price: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  number: {
    type: String,
    validate: {
      validator: (value) => validator.isMobilePhone(value, 'en-IN'),
      message: 'Invalid mobile number'
    },
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Pending'
  }
}, { timestamps: true });


const Order=mongoose.model("Order",orderSchema);
module.exports={Order}