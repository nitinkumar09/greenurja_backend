const e = require("express");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const otpSchema = new Schema({
  mobile: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: "5m",
  },
});
const Otp= mongoose.model("Otp", otpSchema);
module.exports=Otp;