const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, default: null },
  addressLine: { type: String, default: null },
  city: { type: String, default: null },
  state: { type: String, default: null },
  country: { type: String, default: null },
  pincode: { type: String,default: null },
  giftCoins: { type: Number, default: 0 },
  rewardCoins: { type: Number, default: 0 },
});
const User = mongoose.model("User", userSchema);
module.exports = User;
