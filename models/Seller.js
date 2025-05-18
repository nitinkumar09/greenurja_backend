const mongoose = require('mongoose');

const SellerSchema = new mongoose.Schema({
    name: String,
    description: String,
    address: {
        pin: String,
        location: String
    }
});

module.exports = mongoose.model('Seller', SellerSchema);
