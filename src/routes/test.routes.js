const { Router } = require("express");
const { getTest, getPing } = require("../controllers/test.controller");

const router = Router();

// Definir una ruta de prueba
router.get("/jellou_moto", getTest);

// connection test
router.get("/ping", getPing);

module.exports = router;
