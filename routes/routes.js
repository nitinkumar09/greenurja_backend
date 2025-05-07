const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");

const postCarousel = require("../controllers/carousel/postCarousel");
const getCarousel = require("../controllers/carousel/getCarousel");
const getCategories=require("../controllers/categories/getCategories");
const postCategories=require("../controllers/categories/postCategories");
const postproducts = require("../controllers/products/postProduct");
const getproducts = require("../controllers/products/getProducts");
const getProduct = require("../controllers/products/getProduct");
const signUp = require("../controllers/authorisation/signUp");
const login = require("../controllers/authorisation/login");
const resetPassword = require("../controllers/authorisation/resetPassword");
const getCategory = require("../controllers/categories/getCategory");
const updateProduct = require("../controllers/products/updateProduct");
const postOtp = require("../controllers/OTP/postOtp");
const addWishList = require("../controllers/wishList/addWishList");
const deleteWishList = require("../controllers/wishList/deleteWishList");

router.post("/carousel", postCarousel.postCarousel);
router.get("/carousel", getCarousel.getCarousel);
router.get("/categories",getCategories.getCategories);
router.post("/categories",postCategories.postCategories);

router.post("/products", postproducts.postProduct);
router.get("/products", getproducts.getProducts);
router.get("/Product/:_id", getProduct.getProduct);
router.put("/product", updateProduct.updateProduct); // Assuming you have an updateProduct function in postproducts

router.post("/signUp", signUp.signUp);
router.post("/login", login.login);
router.post("/resetPassword", resetPassword.resetPassword);
router.get("/category/:_id", getCategory.getCategory); // Adjust the path as necessary
router.post("/otp", postOtp.postOtp); // Adjust the path as necessary

  router.post("/wishList",verifyToken.verifyToken,addWishList.addWishList);
 // Adjust the path as necessary
 router.delete("/wishList",verifyToken.verifyToken,deleteWishList.deleteWishList); // Adjust the path as necessary
module.exports = router;