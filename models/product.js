const products = [];

// Creating and Exporting Product model
module.exports = class Product {
  constructor(productTitle) {
    this.title = productTitle;
  }
  save() {
    products.unshift(this);
  }
  static fetchAll() {
    return products;
  }
};
