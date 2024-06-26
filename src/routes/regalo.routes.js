const { Router } = require("express");
const pool = require("../db");
const {
  getRegalos,
  getRegalosNoSorteados,
  createRegalo,
  updateRegalo,
  deleteRegalo,
  asignarProfesor,
  getNombreRegalos,
} = require("../controllers/regalo.controller");

const router = Router();

router.get("/regalos", getRegalos);

router.get("/regalos-no-sorteados", getRegalosNoSorteados);

router.post("/regalo", createRegalo);

router.put("/regalo/:id", updateRegalo);

router.put("/asignarProfesor", asignarProfesor);

router.delete("/regalo/:id", deleteRegalo);

router.get("/nombre-regalos", getNombreRegalos);

module.exports = router;
