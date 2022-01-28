const fs = require("fs");
const path = require("path");

const filePath = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "products.json"
);

//   Creating and exporting ** Cart ** Model Class
module.exports = class Cart {
  static addToCart(id) {}
};
