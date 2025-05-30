
require('dotenv').config();
require("./connectDb/conn");
// index.js (top of file)
// const { SMSALERT_API_KEY, SMSALERT_SENDER } = process.env;
// console.log(SMSALERT_API_KEY, SMSALERT_SENDER);


const https = require("https");
const { URLSearchParams } = require("url");
// const cookieParser = require("cookie-parser");
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const app = express();
const route = require("./routes/routes");

// for upload xl file
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}



app.use(cors());
app.use(express.json());



app.use("/api", route);


// function callSmsAlert(params) {
//   return new Promise((resolve, reject) => {
//     const qs = new URLSearchParams(params).toString();
//     console.log(qs);
//     const req = https.request(
//       `https://www.smsalert.co.in/api/push.json?${qs}`,
//       { method: 'POST' },
//       res => {
//         let raw = '';
//         res.on('data', chunk => raw += chunk);
//         res.on('end', () => {
//           try { resolve(JSON.parse(raw)); }
//           catch (e) { reject(e); }
//         });
//       }
//     );
//     req.on('error', reject);
//     req.end();
//   });
// }

// app.post('/send-sms', async (req, res) => {
//   const { mobile, text } = req.body;
//   if (!mobile || !text) return res.status(400).json({ error: 'Missing params' });
//   try {
//     const body = await callSmsAlert({
//       apikey:   SMSALERT_API_KEY,
//       sender:   SMSALERT_SENDER,
//       mobileno: mobile,
//       text
//     });
//     console.log(body);
//     res.json(body);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });



// ✅ Error handling middleware — yaha likho
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ message: err.message });
  } else if (err) {
    return res.status(400).json({ message: err.message });
  }
  next();
});


const port = process.env.PORT || 3001;
app.listen(port, (err) => {
  if (err) console.log(err);
  console.log("Server started at http://localhost:" + port);
});








