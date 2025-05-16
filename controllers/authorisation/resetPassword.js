const User = require("../../models/User"); // Adjust the path as necessary
exports.resetPassword = (async (req, res) => {
  const { email, newPassword } = req.body;
  try {
    // Check if the user with the provided email exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    // Hash the new password
    // const hashedPassword = await bcrypt.hash(newPassword, 10);
    // Update the user's password in the database
    await User.updateOne({ email }, { $set: { password: newPassword } });
    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    console.error('Error resetting password:', error.message);
    res.status(500).json({ error: 'Failed to reset password' });
  }
})