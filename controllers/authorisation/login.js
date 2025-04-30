const User = require("../../models/User"); // Adjust the path as necessary
const jwt = require("jsonwebtoken");
exports.login = async (req, res) => {
    const { email, password } = req.body;
    // console.log("Received sign-in data:", req.body);

    try {
        // Find the user by email and password
        const user = await User.findOne({ email, password });
        if (!user) {
            return res.status(401).json({ error: "Invalid email or password" });
        }
        const token=jwt.sign({ id: user._id, email }, 'sshhh', { expiresIn: '1h' });
        // Send the user data (excluding password) as a response
        user.token=token;
        console.log("Generated token:", token);
        res.status(200).json({user,token});
    } catch (error) {
        console.error("Error signing in:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}