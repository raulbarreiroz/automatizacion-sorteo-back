const { Router } = require("express");
const pool = require("../db");
const {
  getUsuarios,
  createUsuario,
  updateUsuario,
  deleteUsuario,
} = require("../controllers/usuario.controller");
const { route } = require("./catalogo.routes");

console.log("hola");

const router = Router();

router.get("/usuarios", getUsuarios);

router.post("/usuario", createUsuario);

router.put("/usuario/:id", updateUsuario);

router.delete("/usuario/:id", deleteUsuario);

module.exports = router;
