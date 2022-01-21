const express = require("express");
const path = require("path");

const router = express.Router();
const productController = require("../controllers/products");

router.post("/addproduct", productController.postAddProduct);

router.get("/addproduct", productController.getAddProduct);

router.get("/editproduct", productController.getEditProduct);

router.get("/products", productController.getAdminProducts);

module.exports = router;
