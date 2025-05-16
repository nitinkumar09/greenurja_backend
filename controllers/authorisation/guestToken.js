const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

exports.guestToken = async (req, res) => {
    const payload = { id: new mongoose.Types.ObjectId(), isGuest: true };
    const token = jwt.sign(payload, 'greenurjabackendjwt', { expiresIn: '7d' });
    res.cookie('token', token, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 });
    res.json({ token });
}