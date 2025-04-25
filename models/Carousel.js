const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const carouselSchema = new Schema({
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});
const Carousel = mongoose.model("Carousel", carouselSchema);
module.exports = Carousel;