const WishList = require('../../models/wishList');
exports.deleteWishList = async (req, res) => {
    const { productId } = req.body;
    const userId = req.user.id; // Assuming you have the user ID from the token
    
    try {
        const wishlist = await WishList.findOneAndUpdate(
        { userId },
        { $pull: { items: { productId } } }, // Remove the item with the specified productId
        { new: true } // Return the updated wishlist
        );
    
        if (!wishlist) {
        return res.status(404).json({ message: 'Wishlist not found' });
        }
    
        return res.status(200).json(wishlist);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
    }
    }
    