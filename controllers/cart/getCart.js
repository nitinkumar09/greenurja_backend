const mongoose = require('mongoose');
const Cart = require('../../models/Cart');

exports.getCart = async (req, res) => {
    try {
        console.log("req.user:", req.user); // debug

        const ownerId = new mongoose.Types.ObjectId(req.user.id); // ✅ FIXED

        const cart = await Cart.findOne({ ownerId }).populate("items.productId");

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        res.json(cart);
        console.log("cart : ", cart)
    } catch (err) {
        console.error("Error fetching cart:", err);
        res.status(500).json({ error: "Server error" });
    }
};
