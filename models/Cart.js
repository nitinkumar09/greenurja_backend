// server/models/Cart.js
const { Schema, model } = require("mongoose");
const CartSchema = new Schema({
  sessionId: String,        // for guests
  userId: String,           // for authenticated users
  items: [
    {
      productId: String,
      quantity: Number,
    },
  ],
});
Cart= model("Cart", CartSchema);

module.exports=Cart; 