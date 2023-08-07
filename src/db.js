const pg = require("pg");
require("dotenv").config();

const config = {
  connectionString: process.env.DATABASE_URL,
  ssl: true,
};

const pool = new pg.Pool(config);

module.exports = pool;
