const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getProducts = (req, res, next) => {
  req.user
    .getProducts()
    .then((products) => {
      res.render("shop/product-list", {
        allProducts: products,
        pageTitle: "K-Shop | Store",
      });
    })
    .catch((err) => console.log(err));
};

exports.getCart = (req, res, next) => {
  req.user
    .getCart()
    .then((cart) => {
      cart
        .getProducts()
        .then((products) => {
          res.render("shop/cart", {
            pageTitle: "K-Shop | Cart",
            products: products,
            // cart: "dummy",
          });
        })
        .catch((err) => console.log(`cart err : ${err}`));
    })
    .catch((err) => console.log(err));
};

exports.getProductDetails = (req, res, next) => {
  req.user
    .getProducts({ where: { id: req.params.productId } })
    .then((product) => {
      res.render("shop/product-details", {
        pageTitle: "K-Shop | Product Details",
        product: product[0],
      });
    })
    .catch((err) => console.log(err));
};

exports.postAddToCart = (req, res, next) => {
  const prodId = req.params.productId;
  let fetchedCart;
  let newQuantity = 1;
  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: prodId } });
    })
    .then((products) => {
      let product;
      if (products.length > 0) {
        product = products[0];
      }
      if (product) {
        const oldQuantity = product.cartItem.quantity;
        newQuantity = oldQuantity + 1;
        return fetchedCart
          .addProduct(product, {
            through: { quantity: newQuantity },
          })
          .then(() => {
            res.redirect("/cart");
          })
          .catch((err) => console.log(err));
      }
      return Product.findByPk(prodId)
        .then((product) => {
          return fetchedCart
            .addProduct(product, {
              through: { quantity: newQuantity },
            })
            .then(() => {
              res.redirect("/cart");
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};

exports.postRemoveFromCart = (req, res, next) => {
  const prodId = req.params.productId;
  req.user
    .getCart()
    .then((cart) => {
      return cart.getProducts({ where: { id: prodId } });
    })
    .then((products) => {
      const product = products[0];
      return product.cartItem.destroy();
    })
    .then((result) => {
      res.redirect("/cart");
    })
    .catch((err) => console.log(err));
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    pageTitle: "K-Shop | Checkout",
  });
};

exports.createOrder = (req, res, next) => {
  req.user
    .getCart()
    .then((cart) => {
      return cart.getProducts();
    })
    .then((products) => {
      const orders = products.map((product) => {
        product.orderItem = { quantity: product.cartItem.quantity };
        return product;
      });
      return req.user
        .createOrder()
        .then((order) => {
          return order.addProducts(orders);
        })
        .then((result) => {
          res.redirect("/orders");
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    pageTitle: "K-Shop | Orders",
  });
};
