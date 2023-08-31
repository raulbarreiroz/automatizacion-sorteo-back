const { Router } = require("express");

const {
  getCarrerasSinFacultades,
  getCarreras,
  createCarrera,
} = require("../controllers/carrera.controller");

const router = Router();

router.get("/carreras-sin-facultades", getCarrerasSinFacultades);

router.get("/carreras", getCarreras);

router.post("/carrera", createCarrera);

module.exports = router;
