const { Router } = require("express");
const pool = require("../db");

const router = Router();

// Definir una ruta de prueba
router.get("/jellou_moto", (req, res) => {
  res.send("jellou moto");
});

// connection test
router.get("/ping", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    return res.json(result.rows[0]);
  } catch (err) {
    console.log(err);
    console.log(err.detail);
  }
});

module.exports = router;
