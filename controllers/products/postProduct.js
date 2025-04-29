const Product = require("../../models/Products");
exports.postProduct = async (req, res) => {
    try {
        const { name, image, dealOfTheDay, newArrival, price, gst, discount, specifications, category, description, stock } = req.body;
        // console.log("Received product data:", req.body);
        const newProduct = new Product({
            name,
            image,
            dealOfTheDay,
            newArrival,
            price,
            gst,
            discount,
            specifications,
            category,
            description,
            stock
        });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}
// Compare this snippet from GreenUrja-main/backend/models/Categories.js:   