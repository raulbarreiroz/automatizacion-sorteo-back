const pg = require("pg");
require("dotenv").config();

const config = {
  connectionString: process.env.DATABASE_URL,
  ssl: true,
};

console.log("config:");
console.log(config);

const pool = new pg.Pool(config);

module.exports = pool;
