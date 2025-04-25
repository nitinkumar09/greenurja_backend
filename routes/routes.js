const express = require("express");
const router = express.Router();
const postCarousel = require("../controllers/carousel/postCarousel");
const getCategories=require("../controllers/categories/getCategories");
const postCategories=require("../controllers/categories/postCategories");

router.post("/carousel", postCarousel.postCarousel);

router.get("/categories",getCategories.getCategories);
router.post("/categories",postCategories.postCategories);
module.exports = router;