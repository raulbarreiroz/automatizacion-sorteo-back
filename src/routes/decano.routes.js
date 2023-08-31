const { Router } = require("express");
const pool = require("../db");
const { getDecanos } = require("../controllers/decano.controller");

const router = Router();

router.get("/decanos", getDecanos);

module.exports = router;
