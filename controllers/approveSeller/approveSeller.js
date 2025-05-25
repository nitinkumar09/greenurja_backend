// controllers/seller/approveSeller.js
const PendingSeller = require("../../models/PendingSeller");
const ApprovedSeller = require("../../models/ApprovedSeller");

const approveSeller = async (req, res) => {
    try {
        const pendingSeller = await PendingSeller.findById(req.params.id);
        if (!pendingSeller) return res.status(404).json({ message: "Seller not found" });

        const approvedSeller = new ApprovedSeller({
            fullName: pendingSeller.fullName,
            shopName: pendingSeller.shopName,
            email: pendingSeller.email,
            mobileNumber: pendingSeller.mobileNumber,
            password: pendingSeller.password,
            createdAt: pendingSeller.createdAt,
            isAdminVerified: true,
        });

        await approvedSeller.save();
        await PendingSeller.findByIdAndDelete(req.params.id);

        res.status(200).json({ message: "Seller approved successfully" });
    } catch (error) {
        console.error("Error approving seller:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = { approveSeller };
