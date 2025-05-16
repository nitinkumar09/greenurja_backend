const WishList = require('../../models/wishList');

// controllers/addWishList.js
exports.addWishList = async (req, res) => {
  const { productId } = req.body;
  const userId = req.user.id;
  console.log("userId", userId);
  try {
    const wishlist = await WishList.findOneAndUpdate(
      { userId },                             // ← use “userId” here
      {
        $setOnInsert: { userId },              // ← ensure userId is set on first-upsert
        $addToSet: { items: { productId } }    // ← won’t add duplicates
      },
      { new: true, upsert: true }
    );
    return res.status(200).json(wishlist);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};
