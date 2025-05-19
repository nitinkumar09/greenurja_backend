const Seller = require("../../models/Seller");

exports.getSellerByPin = async (req, res) => {
    try {
        const { pin } = req.params;
        console.log("Pin received:", pin);

        const sellers = await Seller.find({ "address.pin": pin });
        console.log("Sellers found:", sellers.length);

        if (!sellers || sellers.length === 0) {
            return res.status(404).json({ message: "No sellers found with this pincode" });
        }

        // Return an array of matched sellers
        const response = sellers.map((seller) => ({
            name: seller.name,
            description: seller.description,
            location: seller.address?.location || "Location not available",
        }));

        return res.json(response);
    } catch (error) {
        console.error("Error in getSellerByPin:", error);
        return res.status(500).json({ message: "Server error" });
    }
};
