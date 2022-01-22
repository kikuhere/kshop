const Product = require("../models/product");

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  if (
    (title !== "") &
    (imageUrl !== "") &
    (price !== "") &
    (description !== "")
  ) {
    const product = new Product(title, imageUrl, price, description);
    product.save();
  }
  res.redirect("/store");
};

exports.getAddProduct = (req, res, next) => {
  res.render("admin/add_product", { pageTitle: "K-Shop | Add a Product" });
};

exports.getEditProduct = (req, res, next) => {
  res.render("admin/edit-product", { pageTitle: "K-Shop | Edit a Product" });
};

exports.getAdminProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("admin/products", {
      allProducts: products,
      pageTitle: "K-Shop | Admin Products",
    });
  });
};
