const Product = require("../models/product");

exports.postAddProduct = (req, res, next) => {
  const id = null;
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
    Product.create({
      title: title,
      imgUrl: imageUrl,
      price: price,
      description: description,
    })
      .then((result) => {
        console.log("product added");
        res.redirect("/store");
      })
      .catch((err) => console.log(err));
  }
};

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "K-Shop | Add a Product",
    editing: false,
  });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  } else {
    Product.findByPk(req.params.productId)
      .then((product) => {
        res.render("admin/edit-product", {
          pageTitle: "K-Shop | Edit a Product",
          editing: editMode,
          product: product,
        });
      })
      .catch((err) => console.log(err));
  }
};

exports.postEditProduct = (req, res, next) => {
  const updatedId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedImageUrl = req.body.imageUrl;
  const updatedPrice = req.body.price;
  const updatedDescription = req.body.description;
  if (
    (updatedTitle !== "") &
    (updatedImageUrl !== "") &
    (updatedPrice !== "") &
    (updatedDescription !== "")
  ) {
    Product.findByPk(updatedId)
      .then((product) => {
        product.title = updatedTitle;
        product.imgUrl = updatedImageUrl;
        product.price = updatedPrice;
        product.description = updatedDescription;
        return product.save();
      })
      .then((result) => {
        res.redirect("/admin/products");
      })
      .catch((err) => console.log(err));
  }
};

exports.postDeleteProduct = (req, res, next) => {
  Product.findByPk(req.params.productId)
    .then((product) => {
      return product.destroy();
    })
    .then((response) => {
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};

exports.getAdminProducts = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render("admin/products", {
        allProducts: products,
        pageTitle: "K-Shop | Admin Products",
      });
    })
    .catch((err) => console.log(err));
};
