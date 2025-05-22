const Admin = require('../../models/Admin');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_ADMIN_PASSWORD = process.env.JWT_ADMIN_PASSWORD;// use enev
const loginAdmin = async (req, res) => {
    const { role, adminId, password } = req.body;

    if (!role || !adminId || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const admin = await Admin.findOne({ adminId, role });
        if (!admin) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Simple text password check (no bcrypt)
        if (admin.password !== password) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: admin._id, role: admin.role },
            JWT_ADMIN_PASSWORD,
            { expiresIn: '1d' }
        );

        res.status(200).json({
            message: 'Admin logged in successfully',
            token,
            role: admin.role,
            adminId: admin.adminId,
            password: admin.password
        });
    } catch (err) {
        console.error('Login error:', err.message);
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = { loginAdmin };
