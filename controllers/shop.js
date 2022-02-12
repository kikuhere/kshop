const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render("shop/product-list", {
        allProducts: products,
        pageTitle: "K-Shop | Store",
      });
    })
    .catch((err) => console.log(err));
};

exports.getCart = (req, res, next) => {
  Cart.getCart((cart) => {
    Product.fetchAll((products) => {
      const cartProducts = [];
      for (product of products) {
        const cartProductData = cart.products.find(
          (prod) => prod.id === product.id
        );
        if (cartProductData) {
          cartProducts.push({
            productDetails: product,
            qnty: cartProductData.qnty,
          });
        }
      }
      res.render("shop/cart", {
        pageTitle: "K-Shop | Cart",
        products: cartProducts,
        cart: cart,
      });
    });
  });
};

exports.getProductDetails = (req, res, next) => {
  Product.findByPk(req.params.productId)
    .then((product) => {
      res.render("shop/product-details", {
        pageTitle: "K-Shop | Product Details",
        product: product,
      });
    })
    .catch((err) => console.log(err));

  // Product.findAll({ where: { id: req.params.productId } })
  //   .then((product) => {
  //     res.render("shop/product-details", {
  //       pageTitle: "K-Shop | Product Details",
  //       product: product[0],
  //     });
  //   })
  //   .catch((err) => console.log(err));
};

exports.postAddToCart = (req, res, next) => {
  const prodId = req.params.productId;
  Product.getById(prodId, (product) => {
    Cart.addToCart(prodId, product.price);
  });
  res.redirect("/cart");
};

exports.postRemoveFromCart = (req, res, next) => {
  const prodId = req.params.productId;
  Product.getById(prodId, (product) => {
    Cart.deleteProduct(prodId, product.price);
  });
  res.redirect("/cart");
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
