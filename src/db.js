const pg = require("pg");
require("dotenv").config();

const deploy = true;

const config = {
  connectionString: deploy
    ? process.env.EXTERNAL_DATABASE_URL
    : process.env.INTERNAL_DATABASE_URL,
};

if (deploy) {
  config["ssl"] = true;
}

const pool = new pg.Pool(config);

module.exports = pool;
