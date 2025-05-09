const Cart = require('../../models/Cart');
exports.postCart = async (req, res) => {
    const ownerId   = req.user.id;
    const { productId, quantity = 1 } = req.body;
  
    try {
      // 1) Attempt to increment existing item's quantity
      let cart = await Cart.findOneAndUpdate(
        { ownerId, "items.productId": productId },
        { $inc: { "items.$.quantity": quantity } },
        { new: true }
      );
  
      if (!cart) {
        // 2) If no matching product, push a new item
        cart = await Cart.findOneAndUpdate(
          { ownerId },
          {
            $setOnInsert: { ownerId },
            $push: { items: { productId, quantity } }
          },
          { upsert: true, new: true }
        );
      }
  
      res.json(cart);
    } catch (err) {
      console.error("Error adding to cart:", err);
      res.status(500).json({ error: 'Server error' });
    }
}