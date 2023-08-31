const pool = require("../db");
const bcrypt = require("bcrypt");

// get de todos los usuarios
const getDecanos = async (req, res, next) => {
  try {
    const result = await pool.query("SELECT * FROM public.decano");
    return res.json(result.rows);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getDecanos,
};
