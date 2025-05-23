const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log(process.env.MONGODB_URL)
    console.log("running succesfully");
  })
  .catch((err) => {
    console.log(err);
  });


