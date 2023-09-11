const { Router } = require("express");

const {
  getTiposDeDonaciones,
  createTipoDeDonacion,
  updateTipoDeDonacion,
  deleteTipoDeDonacion,
} = require("../controllers/tiposDeDonaciones.controller");

const router = Router();

router.get("/tiposDeDonaciones", getTiposDeDonaciones);

router.post("/tipoDeDonacion", createTipoDeDonacion);

router.put("/tipoDeDonacion/:id", updateTipoDeDonacion);

router.delete("/tipoDeDonacion/:id", deleteTipoDeDonacion);

module.exports = router;
