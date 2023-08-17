const { Router } = require("express");
const pool = require("../db");
const {
  getProfesores,
  createProfesor,
  updateProfesor,
  deleteProfesor,
} = require("../controllers/profesor.controller");

const router = Router();

router.get("/profesores", getProfesores);

router.post("/profesor", createProfesor);

router.put("/profesor/:id", updateProfesor);

router.delete("/profesor/:id", deleteProfesor);

module.exports = router;
