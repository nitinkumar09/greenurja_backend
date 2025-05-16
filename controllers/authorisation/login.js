const User = require("../../models/User");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
    const { email, phone, password } = req.body;

    // Check if either email or phone and password are provided
    if ((!email && !phone) || !password) {
        return res.status(400).json({ error: "Email or phone and password are required" });
    }

    try {
        // Find user using email or phone (whichever is provided)
        const user = await User.findOne({
            $or: [
                email ? { email } : null,
                phone ? { phone } : null
            ].filter(Boolean) // remove nulls
        });

        if (!user || user.password !== password) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id }, "sshhh", { expiresIn: "1h" });
        user.token = token;

        res.status(200).json({ user, token });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
