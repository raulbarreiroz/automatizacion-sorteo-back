const pg = require("pg");
require("dotenv").config();

const deploy = true;

const config = {
  connectionString: DATABASE_URL,
};

if (!deploy) {
  config["ssl"] = true;
}

const pool = new pg.Pool(config);

module.exports = pool;
