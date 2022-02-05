const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "k-shop",
  password: "kiran",
});

module.exports = pool.promise();
