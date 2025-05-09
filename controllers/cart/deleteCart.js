const Cart = require('../../models/Cart');

exports.deleteCart = async (req, res) => {
    const ownerId   = req.user.id;
    const { productId, quantity = 1 } = req.body;
  
    try {
      // 1) Attempt to decrement an existing item's quantity
      let cart = await Cart.findOneAndUpdate(
        { ownerId, "items.productId": productId, "items.quantity": { $gt: quantity } },
        { $inc: { "items.$.quantity": -quantity } },
        { new: true }
      );
  
      if (!cart) {
        // 2) If no matching item with quantity > requested, remove it entirely
        cart = await Cart.findOneAndUpdate(
          { ownerId },
          { $pull: { items: { productId } } },
          { new: true }
        );
      }
  
      // If still no cart, it means either no cart at all or nothing to remove
      if (!cart) {
        return res.status(404).json({ error: 'Cart not found or item not in cart' });
      }
  
      return res.json(cart);
    } catch (err) {
      console.error("Error removing from cart:", err);
      return res.status(500).json({ error: 'Server error' });
    }
}