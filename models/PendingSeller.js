// models/PendingSeller.js
const mongoose = require("mongoose");

const pendingSellerSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    shopName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobileNumber: { type: String, required: true },
    password: { type: String, required: true }, // Hashed
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("PendingSeller", pendingSellerSchema);
