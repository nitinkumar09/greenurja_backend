// models/Seller.js
const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    shopName: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('SellerRegister', sellerSchema);
