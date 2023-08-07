const express = require("express");
const { v4: uuidv4 } = require("uuid");
const pool = require("./db");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const PORT = process.env.PORT ?? 8000;
const app = express();

app.use(cors());
app.use(express.json());

// Definir una ruta de prueba
app.get("/", (req, res) => {
  res.send("¡Hola Mundo!");
});

// connection test
app.get("/ping", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    return res.json(result.rows[0]);
  } catch (err) {
    console.log(err);
    console.log(err.detail);
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(
    `Servidor de automatizacion de sorteo iniciado en http://localhost:${port}`
  );
});
