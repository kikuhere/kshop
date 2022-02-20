const express = require("express");
const path = require("path");
const adminData = require("./admin.js");
const router = express.Router();
const shopController = require("../controllers/shop");

router.get("/store", shopController.getProducts);

router.get("/cart", shopController.getCart);

router.get("/product-details/:productId", shopController.getProductDetails);

router.get("/checkout", shopController.getCheckout);

router.post("/add-to-cart/:productId", shopController.postAddToCart);

router.post("/createorder", shopController.createOrder);

router.post("/removefromcart/:productId", shopController.postRemoveFromCart);

router.get("/orders", shopController.getOrders);

module.exports = router;
