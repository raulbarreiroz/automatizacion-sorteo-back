const pool = require("../db");

// Definir una ruta de prueba
const getTest = (req, res) => {
  res.send("jellou moto");
};

// connection test
const getPing = async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    return res.json(result.rows[0]);
  } catch (err) {
    console.log(err);
    console.log(err.detail);
  }
};

module.exports = {
  getTest,
  getPing,
};
