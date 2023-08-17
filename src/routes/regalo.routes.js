const { Router } = require("express");
const pool = require("../db");
const {
  getRegalos,
  createRegalo,
  updateRegalo,
  deleteRegalo,
} = require("../controllers/regalo.controller");

const router = Router();

router.get("/regalos", getRegalos);

router.post("/regalo", createRegalo);

router.put("/regalo/:id", updateRegalo);

router.delete("/regalo/:id", deleteRegalo);

module.exports = router;
