const PendingSeller = require("../../models/PendingSeller");

// GET all pending sellers to show for admin
const getAllPendingSellers = async (req, res) => {
    try {
        const pendingSellers = await PendingSeller.find({}, { password: 0 }); // exclude password for security

        res.status(200).json({
            success: true,
            message: "Fetched all pending sellers",
            data: pendingSellers,
        });
    } catch (error) {
        console.error("Error fetching pending sellers:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

module.exports = { getAllPendingSellers };
