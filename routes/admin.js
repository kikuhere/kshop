const express = require("express");
const path = require("path");

const router = express.Router();
const adminController = require("../controllers/admin");

router.post("/addproduct", adminController.postAddProduct);

router.get("/addproduct", adminController.getAddProduct);

router.get("/editproduct/:productId", adminController.getEditProduct);

router.post("/editproduct", adminController.postEditProduct);

router.post("/deleteproduct/:productId", adminController.postDeleteProduct);

router.get("/products", adminController.getAdminProducts);

module.exports = router;
