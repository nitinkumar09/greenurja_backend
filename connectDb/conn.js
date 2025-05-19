const mongoose = require("mongoose");
require('dotenv').config();
console.log(process.env.MONGO_URI);
mongoose.set("strictQuery", true);
mongoose
  // .connect("mongodb+srv://yadavkapil2336:green@cluster0.tzemhov.mongodb.net/greenurja")
  .connect("mongodb+srv://kumarmongo8865:%40mongo8865@cluster0.we1bjmz.mongodb.net/")
  .then(() => {
    console.log("running succesfully");
  })
  .catch((err) => {
    console.log(err);
  });


