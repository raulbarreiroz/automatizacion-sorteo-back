const { Router } = require("express");

const {
  getTiposDeDonaciones,
} = require("../controllers/tiposDeDonaciones.controller");

const router = Router();

router.get("/tiposDeDonaciones", getTiposDeDonaciones);

module.exports = router;
