const Cart = require('../../models/Cart');

exports.getCart = async (req, res) => {
    const ownerId = req.user.id;

    try {
        // Find the user's cart and optionally populate product details
        const cart = await Cart.findOne({ ownerId }).populate("items.productId")

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        res.json(cart);
    } catch (err) {
        console.error("Error fetching cart:", err);
        res.status(500).json({ error: "Server error" });
    }
};
