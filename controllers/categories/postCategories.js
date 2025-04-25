const Category = require('../../models/Categories');
exports.postCategories = async (req, res) => {
    try {
        const { name,image } = req.body;
        const newCategory = new Category({
            name,
            image
        });
        await newCategory.save();
        res.status(201).json(newCategory);
    } catch (error) {
        console.error("Error creating category:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}