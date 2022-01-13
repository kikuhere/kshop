const express = require("express");
const path = require("path");
const adminData = require("./admin.js");
const router = express.Router();
const productController = require("../controllers/products");

router.get("/store", productController.getProducts);

module.exports = router;
