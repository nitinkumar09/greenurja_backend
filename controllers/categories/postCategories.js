const Category = require('../../models/Categories');
exports.postCategories = async (req, res) => {
    try {
        const { name,image,path } = req.body;
        const newCategory = new Category({
            name,
            image,
            path
        });
        await newCategory.save();
        res.status(201).json(newCategory);
    } catch (error) {
        console.error("Error creating category:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}