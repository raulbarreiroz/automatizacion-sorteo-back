const { Router } = require("express");
const {
  getAutoridades,
  getAutoridad,
  createAutoridadCabecera,
  createAutoridadDetalle,
  updateAutoridadCabecera,
  updateAutoridadDetalle,
  deleteAutoridadCabecera,
  deleteAutoridadDetalle,
} = require("../controllers/autoridad.controller");

const router = Router();

router.get("/autoridades", getAutoridades);

router.get("/autoridad/:id", getAutoridad);

router.post("/autoridad_cabecera", createAutoridadCabecera);

router.post("/autoridad_detalle", createAutoridadDetalle);

router.put("/autoridad_cabecera/:id", updateAutoridadCabecera);

router.put("/autoridad_detalle/:id", updateAutoridadDetalle);

router.delete("/autoridad_cabecera/:id", deleteAutoridadCabecera);

router.delete("/autoridad_detalle/:id", deleteAutoridadDetalle);

module.exports = router;
