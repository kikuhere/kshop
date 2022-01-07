const express = require("express");
const app = express();
const ejs = require("ejs");
const path = require("path");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

const products = [];

app.get("/", (req, res, next) => {
  res.render("index", { pageTitle: "K-Shop | Your Shopping Destination" });
});

app.get("/store", (req, res, next) => {
  res.render("store", { allProducts: products, pageTitle: "K-Shop | Store" });
});

app.post("/addproduct", (req, res, next) => {
  if (req.body.title !== "") {
    products.unshift(req.body.title);
  }
  res.redirect("/store");
});

app.get("/addproduct", (req, res, next) => {
  res.render("add_product", { pageTitle: "K-Shop | Add a Product" });
});

app.use((req, res, next) => {
  res.render("404", { pageTitle: "Oh.. Noo <br> You are Lost somewhere" });
});

app.listen(3000, () => {
  console.log("server started at 3000");
});
