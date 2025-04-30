// const Category = require('../../models/Category');
const Product = require('../../models/Products'); // Import the Product model
exports.getCategory = async (req, res) => {
   // Extract the category ID from the request parameters

    try {
        const categoryId = req.params._id;       
        console.log(categoryId)                   // read the category filter :contentReference[oaicite:0]{index=0}
        const products = await Product.find({ category: categoryId }).populate('category', 'name -_id');   // query Mongoose by ObjectId field :contentReference[oaicite:1]{index=1}
        return res.json(products);                                       // send JSON array back to client :contentReference[oaicite:2]{index=2}
      } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
      }
}