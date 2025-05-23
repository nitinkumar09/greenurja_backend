const PendingSeller = require("../../models/PendingSeller");
const bcrypt = require("bcryptjs");

const registerpendinggSeller = async (req, res) => {
    const { fullName, shopName, email, mobileNumber, password } = req.body;

    // check duplicate email
    const existing = await PendingSeller.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already pending approval" });

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const pendingSeller = new PendingSeller({
        fullName,
        shopName,
        email,
        mobileNumber,
        password: hashedPassword,
    });

    await pendingSeller.save();

    res.status(200).json({
        message: "Registration received. Awaiting admin approval.",
    });
};

module.exports = { registerpendinggSeller };
