const express = require("express");
const app = express();
const ejs = require("ejs");
const path = require("path");
const adminRoutes = require("./routes/admin.js");
const shopRoutes = require("./routes/shop.js");
const pageNotFound = require("./controllers/404");
const Product = require("./models/product");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res, next) => {
  Product.fetchAll()
    .then(([products, fieldsData]) => {
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

app.listen(3000, () => {
  console.log("server started at 3000");
});
