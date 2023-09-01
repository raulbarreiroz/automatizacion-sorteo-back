const { Router } = require("express");

const {
  getCarrerasSinFacultades,
  getCarreras,
  createCarrera,
  updateCarrera,
  deleteCarrera,
} = require("../controllers/carrera.controller");

const router = Router();

router.get("/carreras-sin-facultades", getCarrerasSinFacultades);

router.get("/carreras", getCarreras);

router.post("/carrera", createCarrera);

router.put("/carrera/:id", updateCarrera);

router.delete("/carrera/:id", deleteCarrera);

module.exports = router;
