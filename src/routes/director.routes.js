const { Router } = require("express");

const { getDirectores } = require("../controllers/director.controller");

const router = Router();

router.get("/directores", getDirectores);

module.exports = router;
