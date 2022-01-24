const Product = require("../models/product");

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

exports.getProductDetails = (req, res, next) => {
  res.render("shop/product-details", {
    pageTitle: "K-Shop | Product Details",
    productId: req.params.productId,
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    pageTitle: "K-Shop | Checkout",
  });
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    pageTitle: "K-Shop | Orders",
  });
};
