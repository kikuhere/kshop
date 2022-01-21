const Product = require("../models/product");

exports.postAddProduct = (req, res, next) => {
  if (req.body.title !== "") {
    const product = new Product(req.body.title);
    product.save();
  }
  res.redirect("/store");
};

exports.getAddProduct = (req, res, next) => {
  res.render("admin/add_product", { pageTitle: "K-Shop | Add a Product" });
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/product-list", {
      allProducts: products,
      pageTitle: "K-Shop | Store",
    });
  });
};

exports.getCart = (req, res, next) => {
  res.render("shop/cart", {
    pageTitle: "K-Shop | Cart",
  });
};

exports.getEditProduct = (req, res, next) => {
  res.render("admin/edit-product", { pageTitle: "K-Shop | Edit a Product" });
};

exports.getProductDetails = (req, res, next) => {
  res.render("shop/product-details", {
    pageTitle: "K-Shop | Product Details",
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    pageTitle: "K-Shop | Checkout",
  });
};

exports.getAdminProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("admin/products", {
      allProducts: products,
      pageTitle: "K-Shop | Admin Products",
    });
  });
};
