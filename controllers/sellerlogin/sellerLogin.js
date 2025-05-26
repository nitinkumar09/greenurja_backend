const SellerLogin = require('../../models/ApprovedSeller');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { JWT_SELLER_PASSWORD } = require('../../config');
console.log("JWT_SELLER_PASSWORD in controller:", JWT_SELLER_PASSWORD);

// Seller Login Controller
const loginSeller = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const seller = await SellerLogin.findOne({ email });
        console.log(seller)
        if (!seller) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, seller.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: seller._id, email: seller.email },
            JWT_SELLER_PASSWORD,
            { expiresIn: '1d' }
        );

        res.status(200).json({
            message: 'Seller logged in successfully',
            token,
            email: seller.email
        });
    } catch (err) {
        console.error('Seller login error:', err.message);
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = { loginSeller };
