const Cart = require('../../models/Cart');
exports.deleteCart = async (req, res) => {
  const ownerId = req.user.id; // decoded from token
  const { productId, quantity = 1 } = req.body;

  try {
    // Try to decrement quantity
    let cart = await Cart.findOneAndUpdate(
      { ownerId, "items.productId": productId, "items.quantity": { $gt: quantity } },
      { $inc: { "items.$.quantity": -quantity } },
      { new: true }
    );

    if (!cart) {
      // Else remove the item completely
      cart = await Cart.findOneAndUpdate(
        { ownerId },
        { $pull: { items: { productId } } },
        { new: true }
      );
    }

    if (!cart) {
      return res.status(404).json({ error: 'Cart not found or item not in cart' });
    }

    return res.json(cart);
  } catch (err) {
    console.error("Error removing from cart:", err);
    return res.status(500).json({ error: 'Server error' });
  }
};
