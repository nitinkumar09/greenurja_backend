const Otp= require("../../models/Otp");
exports.postOtp = async (req, res) => {
    const { mobile } = req.body;
    console.log("Received request to create OTP:", req.body);

    try {
        // Generate a 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        console.log("Generated OTP:", otp);

        // Save the OTP to the database
        
        // Prepare parameters for x-www-form-urlencoded format
        const qs={
            authorization: process.env.FAST2SMS_API_KEY, // Spelling: "authorization
            
        }
        const params = new URLSearchParams();
        params.append("authorization", process.env.FAST2SMS_API_KEY); // Spelling: "authorization" not "Authorisation"
        params.append("route", "q");
        params.append("message", `Your OTP code is ${otp}`);
        params.append("language", "english");
        params.append("flash", "0");
        params.append("numbers", mobile);
        console.log("Parameters for SMS API:", params.toString());
        // Send the OTP via Fast2SMS
        const response = await fetch("https://www.fast2sms.com/dev/bulkV2", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: params
        });
        
        const data = await response.json();
        
        if (data.return === true) {
            const newOtp = new Otp({ mobile, otp });
            await newOtp.save();
            console.log("SMS sent successfully:", data);
            res.status(201).json({ message: "OTP sent successfully" });
        } else {
            console.error("SMS API Error:", data);
            res.status(500).json({ error: "Failed to send OTP" });
        }
    } catch (error) {
        console.error("Error creating OTP:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}