const { Router } = require("express");

const { getSorteos, getSorteo } = require("../controllers/sorteo.controller");

const router = Router();

router.get("/sorteos", getSorteos);

router.get("/sorteo/:id", getSorteo);

/*
router.post("/usuario", createUsuario);

router.put("/usuario/:id", updateUsuario);

router.delete("/usuario/:id", deleteUsuario);
*/

module.exports = router;
