const WishList= require('../../models/wishList');
exports.getWishList = async (req, res) => {
    const userId = req.user.id; // Assuming you have the user ID from the token
    try {
        const wishlist = await WishList.findOne({ userId }).populate('items.productId', 'name price image'); // Populate the product details
        if (!wishlist) {
            return res.status(404).json({ message: 'Wishlist not found' });
        }
        return res.status(200).json(wishlist);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
    }
}