const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "User"
    },
    cart: [
      {
        productId: String,
        quantity: Number,
        name: String,
        price: Number
      }
    ],
    products:{
      type:mongoose.Schema.ObjectId,
      ref:"Products"
    },
    active: {
      type: Boolean,
      default: true
    },
    modifiedOn: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);

