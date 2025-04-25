const mongoose = require("mongoose");
require("./connectDb/conn");


// const cookieParser = require("cookie-parser");
const express = require("express");
const cors = require("cors");
const app = express();
const route = require("./routes/routes");
app.use(cors());
app.use(express.json());
app.use("/api", route);










const port = process.env.PORT || 3001;
app.listen(port, (err) => {
  if (err) console.log(err);
  console.log("Server started at http://localhost:" + port);
});
