const ApprovedSeller = require('../../models/ApprovedSeller');

exports.getApprovedSellerstoShow = async (req, res) => {
    try {
        const sellers = await ApprovedSeller.find({ role: 'seller', isApproved: true }).select('-password');
        res.status(200).json({ data: sellers });
    } catch (error) {
        console.error("Error fetching approved sellers:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
