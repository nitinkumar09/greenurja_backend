const Product = require("../../models/Products");
exports.getProducts = async (req, res) => {
    const {_id}=req.params;
    try {
        const products = await Product.find({}).populate("category", "name");
        res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}