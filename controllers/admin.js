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
    const product = new Product(id, title, imageUrl, price, description);
    product
      .save()
      .then(() => {
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
    Product.getById(req.params.productId, (singleProduct) => {
      res.render("admin/edit-product", {
        pageTitle: "K-Shop | Edit a Product",
        editing: editMode,
        product: singleProduct,
      });
    });
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
    const updatedProduct = new Product(
      updatedId,
      updatedTitle,
      updatedImageUrl,
      updatedPrice,
      updatedDescription
    );
    updatedProduct.save();
    res.redirect("/admin/products");
  }
};

exports.postDeleteProduct = (req, res, next) => {
  const productId = req.params.productId;
  Product.deleteById(productId);
  res.redirect("/admin/products");
};

exports.getAdminProducts = (req, res, next) => {
  Product.fetchAll()
    .then(([products]) => {
      res.render("admin/products", {
        allProducts: products,
        pageTitle: "K-Shop | Admin Products",
      });
    })
    .catch((err) => console.log(err));
};
