const Sequelize = require("sequelize");

const sequelize = new Sequelize("k-shop", "root", "kiran", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
