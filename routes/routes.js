const express = require("express");
const router = express.Router();
const postCarousel = require("../controllers/carousel/postCarousel");
const getCategories=require("../controllers/categories/getCategories");
const postCategories=require("../controllers/categories/postCategories");
const postproducts = require("../controllers/products/postProduct");
const getproducts = require("../controllers/products/getProducts");
const getProduct = require("../controllers/products/getProduct");
const signUp = require("../controllers/authorisation/signUp");
const login = require("../controllers/authorisation/login");
const resetPassword = require("../controllers/authorisation/resetPassword");
// const getCategory = require("../controllers/categories/getCategory");
router.post("/carousel", postCarousel.postCarousel);

router.get("/categories",getCategories.getCategories);
router.post("/categories",postCategories.postCategories);

router.post("/products", postproducts.postProduct);
router.get("/products", getproducts.getProducts);
router.get("/Product/:_id", getProduct.getProduct);
router.post("/signUp", signUp.signUp);
router.post("/login", login.login);
router.post("/resetPassword", resetPassword.resetPassword);
// router.get("/category", getCategory.getCategory); // Adjust the path as necessary

module.exports = router;