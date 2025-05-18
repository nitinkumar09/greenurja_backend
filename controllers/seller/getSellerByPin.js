const Seller = require("../../models/Seller");

exports.getSellerByPin = async (req, res) => {
    try {
        const { pin } = req.params;

        const seller = await Seller.findOne({ "address.pin": pin });

        if (!seller) {
            return res.status(404).json({ message: "No seller found with this pincode" });
        }

        return res.json({
            name: seller.name,
            description: seller.description,
            location: seller.address.location,
        });
    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
};
