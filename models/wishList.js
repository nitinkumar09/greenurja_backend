const mongoose = require('mongoose');
const Schema=mongoose.Schema;

const wishListSchema = new Schema({
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    items: [
      new Schema({
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        }
      }, { _id: false })            // ← disable sub-document IDs!
    ]
  });
  



const WishList= mongoose.model("WishList",wishListSchema);
module.exports=WishList;