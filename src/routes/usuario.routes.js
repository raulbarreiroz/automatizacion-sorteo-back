const { Router } = require("express");
const pool = require("../db");
const {
  getUsuarios,
  createUsuario,
  updateUsuario,
  deleteUsuario,
  inciarSesion,
  createGestor,
  sesionIniciada,
} = require("../controllers/usuario.controller");
const { route } = require("./catalogo.routes");

const router = Router();

router.get("/usuarios", getUsuarios);

router.post("/usuario", createUsuario);

router.post("/gestor", createGestor);

router.put("/usuario/:id", updateUsuario);

router.delete("/usuario/:id", deleteUsuario);

router.post("/iniciar-sesion", inciarSesion);

router.post("/sesion-iniciada", sesionIniciada);

module.exports = router;
