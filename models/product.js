const Sequelize = require("sequelize");
const sequelize = require("../database");

const Product = sequelize.define("product", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  imgUrl: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
});

module.exports = Product;
