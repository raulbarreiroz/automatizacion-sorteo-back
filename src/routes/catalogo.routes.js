const { Router } = require("express");
const {
  getCatalogos,
  getCatalogo,
  createCatalogoCabecera,
  createCatalogoDetalle,
  updateCatalogoCabecera,
  updateCatalogoDetalle,
  deleteCatalogoCabecera,
  deleteCatalogoDetalle,
} = require("../controllers/catalogo.controller");

const router = Router();

router.get("/catalogos", getCatalogos);

router.get("/catalogo/:id", getCatalogo);

router.post("/catalogo_cabecera", createCatalogoCabecera);

router.post("/catalogo_detalle", createCatalogoDetalle);

router.put("/catalogo_cabecera/:id", updateCatalogoCabecera);

router.put("/catalogo_detalle/:id", updateCatalogoDetalle);

router.delete("/catalogo_cabecera/:id", deleteCatalogoCabecera);

router.delete("/catalogo_detalle/:id", deleteCatalogoDetalle);

module.exports = router;
