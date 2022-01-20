const fs = require("fs");
const path = require("path");

const filePath = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "products.json"
);

// Creating and Exporting Product model
module.exports = class Product {
  constructor(productTitle) {
    this.title = productTitle;
  }

  save() {
    fs.readFile(filePath, (err, fileContent) => {
      let products = [];
      if (!err) {
        products = JSON.parse(fileContent);
      }
      products.unshift(this);
      fs.writeFile(filePath, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
  }
  static fetchAll(cb) {
    fs.readFile(filePath, (err, fileContent) => {
      if (err) {
        return cb([]);
      }
      cb(JSON.parse(fileContent));
    });
  }
};
