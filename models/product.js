const db = require("../database");
const Cart = require("./cart");

// Creating and Exporting Product model
module.exports = class Product {
  constructor(id, title, imageUrl, price, description) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }

  // Saving product model to a file
  save() {
    return db.execute(
      "INSERT INTO products (title, price, description, imageUrl) VALUES (?, ?, ?, ?)",
      [this.title, this.price, this.description, this.imageUrl]
    );
  }

  // Getting all products in the database
  static fetchAll() {
    return db.execute("SELECT * FROM products ORDER BY -id");
  }

  // Get a Single product
  static getById(id) {
    return db.execute("SELECT * FROM products WHERE id = ?", [id]);
  }

  // Delete a product
  static deleteById(productId) {
    return db.execute("DELETE FROM products WHERE id = ?", [productId]);
  }
};
