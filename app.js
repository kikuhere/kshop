const express = require("express");
const app = express();
const ejs = require("ejs");
const path = require("path");
const adminRoutes = require("./routes/admin.js");
const shopRoutes = require("./routes/shop.js");
const pageNotFound = require("./controllers/404");

const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");

const sequelize = require("./database");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.get("/", (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render("shop/index", {
        pageTitle: "K-Shop | Your Shopping Destination",
        products: products,
      });
    })
    .catch((err) => console.log(err));
});

// getting all admin related routes
app.use("/admin", adminRoutes);

// getting all shop related routes
app.use(shopRoutes);

// getting 404 route from controller
app.use(pageNotFound.get404);

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

sequelize
  .sync()
  .then((response) => {
    // console.log(response);
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({ name: "kiran", email: "test@test.com" });
    }
    return user;
  })
  .then((user) => {
    user.getCart((cart) => {
      if (!cart) {
        return user.createCart();
      }
    });
  })
  .then((cart) => {
    app.listen(3000, () => {
      console.log("server started at 3000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
