const fs = require("fs");
const path = require("path");

const filePath = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "products.json"
);

// Helper function to get all products from the database
const getProductsFromFile = (cb) => {
  fs.readFile(filePath, (err, fileContent) => {
    if (err) {
      return cb([]);
    }
    cb(JSON.parse(fileContent));
  });
};

// Creating and Exporting Product model
module.exports = class Product {
  constructor(title, imageUrl, price, description) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }

  // Saving product model to a file
  save() {
    getProductsFromFile((products) => {
      products.unshift(this);
      fs.writeFile(filePath, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
  }

  // Getting all products in the database
  static fetchAll(cb) {
    getProductsFromFile(cb);
  }
};
