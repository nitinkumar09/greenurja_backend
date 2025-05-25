const mongoose = require("mongoose");

const approvedSellerSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    shopName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobileNumber: { type: String, required: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    isAdminVerified: { type: Boolean, default: true }, // Always true once approved
});

module.exports = mongoose.model("ApprovedSeller", approvedSellerSchema);
