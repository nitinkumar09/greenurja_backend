// controllers/registerSellerController.js
const SellerRegister = require('../../models/SellerRegister');
const bcrypt = require('bcryptjs');

const registerSeller = async (req, res) => {
    try {
        const { fullName, shopName, mobileNumber, email, password } = req.body;

        // Check if email already exists
        const existingSeller = await SellerRegister.findOne({ email });
        if (existingSeller) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newSeller = new SellerRegister({
            fullName,
            shopName,
            mobileNumber,
            email,
            password: hashedPassword
        });

        await newSeller.save();
        res.status(201).json({ message: 'Seller registered successfully', sellerId: newSeller._id });

    } catch (error) {
        console.error('Registration Error:', error);
        res.status(500).json({ message: 'Server error during registration' });
    }
};

module.exports = { registerSeller };
