const Product = require("../../models/Products");
exports.getProduct = async (req, res) => {
    const { _id } = req.params;
    console.log("Received product ID:", req.params);

    try {
        const products = await Product.find({_id}).populate('category', 'name -_id');
        res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}