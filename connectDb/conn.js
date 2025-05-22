const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
mongoose
  // .connect("mongodb+srv://yadavkapil2336:green@cluster0.tzemhov.mongodb.net/greenurja")
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log(process.env.MONGODB_URL)
    console.log("running succesfully");
  })
  .catch((err) => {
    console.log(err);
  });


