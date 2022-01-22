const express = require("express");
const path = require("path");
const adminData = require("./admin.js");
const router = express.Router();
const shopController = require("../controllers/shop");

router.get("/store", shopController.getProducts);

router.get("/cart", shopController.getCart);

router.get("/product-details", shopController.getProductDetails);

router.get("/checkout", shopController.getCheckout);

module.exports = router;
