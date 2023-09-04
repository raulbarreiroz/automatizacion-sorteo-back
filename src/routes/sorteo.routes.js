const { Router } = require("express");

const {
  getSorteos,
  agregarRegistroBitacora,
  getBitacora,
} = require("../controllers/sorteo.controller");

const router = Router();

router.get("/sorteos/tipo_donacion_id", getSorteos);

router.get("/bitacora", getBitacora);

router.post("/agregar-registro-bitacora", agregarRegistroBitacora);

/*
router.post("/usuario", createUsuario);

router.put("/usuario/:id", updateUsuario);

router.delete("/usuario/:id", deleteUsuario);
*/

module.exports = router;
