const Product = require('../../models/Products');

exports.updateProduct = async (req, res) => {
    try {
    
        const {id,name, image, dealOfTheDay, newArrival, price, gst, discount, specifications, category, description, stock } = req.body;

        // Find the product by ID and update it
        const updatedProduct = await Product.findByIdAndUpdate(
            {_id:id},
            {
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
            },
            { new: true } // Return the updated document
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}
//