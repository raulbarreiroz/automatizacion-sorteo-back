const { Router } = require("express");
const pool = require("../db");

const router = Router();

router.get("/usuarios", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM usuario");
    return res.json(result.rows);
  } catch (err) {
    console.log(err);
    console.log(err.detail);
  }
});

module.exports = router;
