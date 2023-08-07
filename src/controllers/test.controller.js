const pool = require("../db");

// Definir una ruta de prueba
const getTest = (req, res, next) => {
  try {
    res.send("jellou moto");
  } catch (err) {
    next(err);
  }
};

// connection test
const getPing = async (req, res, next) => {
  try {
    const result = await pool.query("SELECT NOW()");
    return res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getTest,
  getPing,
};
