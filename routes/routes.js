const express = require("express");
const router = express.Router();
const postCarousel = require("../controllers/carousel/postCarousel");
const getCategories=require("../controllers/categories/getCategories");
const postCategories=require("../controllers/categories/postCategories");
const postproducts = require("../controllers/products/postProduct");
const getproducts = require("../controllers/products/getProducts");

router.post("/carousel", postCarousel.postCarousel);

router.get("/categories",getCategories.getCategories);
router.post("/categories",postCategories.postCategories);

router.post("/products", postproducts.postProduct);
router.get("/products", getproducts.getProducts);
module.exports = router;