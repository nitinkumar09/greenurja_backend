const User = require("../../models/User"); // Adjust the path as necessary
const jwt = require("jsonwebtoken");
exports.signUp = async (req, res) => {
    const { firstName, lastName, email, password, phone } = req.body;
    console.log("Received sign-up data:", req.body);

    try {
        // Check if the user already exists
        // Check if the user already exists

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        // Create a new user add phone debugging
        // Crehghjhkkjkjhkjkhkhjj
        // Createhgjghggkhkgkggjg


        const newUser = new User({
            firstName,
            lastName,
            email,
            password,
            phone: String(phone),
        });

        const token = jwt.sign({ id: newUser._id, email }, 'greenurjabackendjwt', { expiresIn: '24h' });

        // console.log("Generated token:", token);
        // Save the user to the database
        await newUser.save();
        console.log("New data after save", newUser)
        res.status(201).json({ newUser, token });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}