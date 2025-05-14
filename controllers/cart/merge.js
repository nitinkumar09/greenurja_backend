const Cart = require('../../models/Cart');

exports.mergeCart = async (req, res) => {
    const ownerId = req.user.id; // 🔒 Token se aaya hua user ID
    const guestItems = Array.isArray(req.body.cartItems) ? req.body.cartItems : [];

    try {
        // User ke liye cart laao ya naya banao
        let cart = await Cart.findOne({ ownerId });
        if (!cart) {
            cart = new Cart({ ownerId, items: [] });
        }

        // Cart merge karo
        guestItems.forEach(item => {
            const idx = cart.items.findIndex(ci => ci.productId.toString() === item._id);
            if (idx > -1) {
                cart.items[idx].quantity += item.quantity;
            } else {
                cart.items.push({ productId: item._id, quantity: item.quantity });
            }
        });

        await cart.save();
        return res.json(cart);
    } catch (err) {
        console.error('Error merging cart:', err);
        return res.status(500).json({ error: 'Server error' });
    }
};
