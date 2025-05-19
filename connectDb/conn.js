const mongoose = require("mongoose");
require('dotenv').config();
// console.log(process.env.MONGO_URI);
mongoose.set("strictQuery", true);
mongoose
  .connect("mongodb+srv://yadavkapil2336:green@cluster0.tzemhov.mongodb.net/greenurja")
  .then(() => {
    console.log("running succesfully");
  })
  .catch((err) => {
    console.log(err);
  });


