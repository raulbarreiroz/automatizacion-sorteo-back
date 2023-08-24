const { Router } = require("express");

const { getFacultades, getTiposDeDonaciones } = require("../controllers/facultad.controller");

const router = Router();

router.get("/facultades", getFacultades);

router.get("/tiposDeDonaciones", getTiposDeDonaciones)

module.exports = router;
