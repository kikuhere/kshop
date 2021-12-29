const express = require("express");
const app = express();
const pug = require("pug");
const path = require("path");

app.set("view engine", "pug");
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

const products = [];

app.get("/", (req, res, next) => {
  res.render("index");
});

app.get("/store", (req, res, next) => {
  res.render("store", { allProducts: products });
});

app.post("/addproduct", (req, res, next) => {
  products.unshift(req.body.title);
  res.redirect("/store");
});

app.get("/addproduct", (req, res, next) => {
  res.render("add_product");
});

app.listen(3000, () => {
  console.log("server started at 3000");
});
