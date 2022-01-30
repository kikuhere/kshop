const fs = require("fs");
const path = require("path");

const filePath = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "cart.json"
);

//   Creating and exporting ** Cart ** Model Class
module.exports = class Cart {
  static addToCart(id, productPrice) {
    fs.readFile(filePath, (err, fileContent) => {
      // getting previous cart
      let cart = { products: [], totalPrice: 0 }; // assigning eampty cart
      if (!err) {
        cart = JSON.parse(fileContent); // if no error there is some file and content
      }

      // finding existing products (if any)
      const existingProductIndex = cart.products.findIndex(
        (prod) => prod.id === id
      );
      const existingProduct = cart.products[existingProductIndex];

      // Analyzing the cart.. if user ads the same product again we need to incriment the price and qnty
      let updatedProduct;
      if (existingProduct) {
        updatedProduct = { ...existingProduct }; //taking existing product to the updated product variable
        updatedProduct.qnty = updatedProduct.qnty + 1; // increasing the quantity
        cart.products = [...cart.products]; // replacing the products in the cart with the latest updated proeduct
        cart.products[existingProductIndex] = updatedProduct; // replacing the existing product with updated product
      } else {
        updatedProduct = { id: id, qnty: 1 };
        cart.products = [...cart.products, updatedProduct]; // adding new product to the cart
      }
      cart.totalPrice = cart.totalPrice + +productPrice;
      fs.writeFile(filePath, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
  }
};
