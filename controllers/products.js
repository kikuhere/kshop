const Product = require("../models/product");

exports.postAddProduct = (req, res, next) => {
  if (req.body.title !== "") {
    const product = new Product(req.body.title);
    product.save();
  }
  res.redirect("/store");
};

exports.getAddProduct = (req, res, next) => {
  res.render("add_product", { pageTitle: "K-Shop | Add a Product" });
};

exports.getProducts = (req, res, next) => {
  const products = Product.fetchAll();
  res.render("store", {
    allProducts: products,
    pageTitle: "K-Shop | Store",
  });
};
