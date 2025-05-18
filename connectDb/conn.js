const mongoose = require("mongoose");
require('dotenv').config();
mongoose.set('strictQuery', true);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("running succesfully");
  })
  .catch((err) => {
    console.log(err);
  });


