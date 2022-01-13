const express = require("express");
const path = require("path");

const router = express.Router();
const productController = require("../controllers/products");

router.post("/addproduct", productController.postAddProduct);

router.get("/addproduct", productController.getAddProduct);

module.exports = router;
