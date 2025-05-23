const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const adminSchema = new mongoose.Schema({
    // role: {
    //     type: String,
    //     required: true,
    //     enum: ['admin', 'superadmin'], // you can customize
    // },
    adminId: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
});

// Hash password before saving
adminSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;
