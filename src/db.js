const pg = require("pg");
require("dotenv").config();

/*
const pool = new Pool({

  user: process.env.USUARIO,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  database: process.env.DBNAME,
  
  port: process.env.DBPORT,
  connectionString: process?.env?.DATABASE_URL,
});
*/

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

module.exports = pool;
