const { Router } = require("express");
const pool = require("../db");
const {
  createFacultad,
  getFacultades,
  updateFacultad,
  deleteFacultad,
} = require("../controllers/facultad.controller");

const router = Router();

router.post("/facultad", createFacultad);

router.get("/facultades", getFacultades);

router.put("/facultad/:id", updateFacultad);

router.delete("/facultad/:id", deleteFacultad);

module.exports = router;
