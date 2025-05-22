const Admin = require('../../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { JWT_ADMIN_PASSWORD } = require('../../config');

// Admin Login Controllers
const loginAdmin = async (req, res) => {
    const { adminId, password } = req.body;

    if (!adminId || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const admin = await Admin.findOne({ adminId });
        if (!admin) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: admin._id },
            JWT_ADMIN_PASSWORD,
            { expiresIn: '1d' }
        );

        res.status(200).json({
            message: 'Admin logged in successfully',
            token,
            adminId: admin.adminId
        });
    } catch (err) {
        console.error('Login error:', err.message);
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = { loginAdmin };
