const pool = require("../db");

// get de todos los catalogos con sus detalles
const getCatalogos = async (req, res, next) => {
  try {
    const catalogo = await pool.query(`select 
cabecera.*,
(
  select json_agg(
    json_build_object(
      'id', id, 
      'nombre',nombre, 
      'descripcion',descripcion, 
      'creado_por',creado_por, 
      'fecha_creacion',fecha_creacion, 
      'modificado_por',modificado_por, 
      'fecha_modificacion',fecha_modificacion, 
      'cabecera_id',cabecera_id,
      'estado', estado
    ) 
  ) as detalles
  from catalogo_detalle detalle
  where detalle.cabecera_id = cabecera.id
    and detalle.estado = 'A'
)
from catalogo_cabecera cabecera
WHERE cabecera.estado='A'`);
    return res.json(catalogo.rows);
  } catch (err) {
    next(err);
  }
};

// create catalogo_cabecera
const createCatalogoCabecera = async (req, res, next) => {
  const { nombre, descripcion, creado_por } = req.body;

  try {
    const catalogoCabecera = await pool.query(
      `INSERT INTO public.catalogo_cabecera(
      nombre, descripcion, creado_por, fecha_creacion, estado)
      VALUES ($1, $2, $3, NOW(), 'A');`,
      [nombre, descripcion, creado_por]
    );
    res.json(catalogoCabecera);
  } catch (err) {
    next(err);
  }
};

// create catalogo_detalle
const createCatalogoDetalle = async (req, res, next) => {
  const { nombre, descripcion, creado_por, cabecera } = req.body;

  try {
    const catalogoDetalle = await pool.query(
      `INSERT INTO public.catalogo_detalle(
      nombre, descripcion, creado_por, fecha_creacion, cabecera, estado)
      VALUES ($1, $2, $3, NOW(), $4, 'A');`,
      [nombre, descripcion, creado_por, cabecera]
    );
    res.json(catalogoDetalle);
  } catch (err) {
    next(err);
  }
};

// update catalogo_cabecera
const updateCatalogoCabecera = async (req, res, next) => {
  const { id } = req.params;
  const { nombre, descripcion, modificado_por } = req.body;

  console.log("id: ");
  console.log(id);

  try {
    const text = `
    UPDATE public.catalogo_cabecera SET 
      nombre = '${nombre}', 
      descripcion = '${descripcion}',
      modificado_por = array_append(modificado_por, '${modificado_por}'),
      fecha_modificacion = array_append(fecha_modificacion, NOW()),
      estado = '${estado}'
    WHERE id in (${id})`;

    const query = { text };

    const catalogoCabeceraEditado = await pool.query(query);

    res.json(catalogoCabeceraEditado);
  } catch (err) {
    next(err);
  }
};

// update catalogo_detalle
const updateCatalogoDetalle = async (req, res, next) => {
  const { id } = req.params;
  const { nombre, descripcion, modificado_por, estado } = req.body;
  console.log("id: ");
  console.log(id);

  try {
    const newValues = {
      nombre,
      descripcion,
      modificado_por,
    };
    const text = `
    UPDATE public.catalogo_detalle SET 
      nombre = '${nombre}', 
      descripcion = '${descripcion}',
      modificado_por = array_append(modificado_por, '${modificado_por}'),
      fecha_modificacion = array_append(fecha_modificacion, NOW()),
      estado = '${estado}'
    WHERE id in (${id})`;

    const query = { text };

    const catalogoDetalleEditado = await pool.query(query);

    res.json(catalogoDetalleEditado);
  } catch (err) {
    next(err);
  }
};

const deleteCatalogoCabecera = async (req, res, next) => {
  const { id } = req.params;

  try {
    const text = `
    UPDATE public.catalogo_cabecera SET 
      estado = 'I'
    WHERE id in (${id})`;

    const query = { text };

    const catalogoCabeceraEliminado = await pool.query(query);

    res.json(catalogoCabeceraEliminado);
  } catch (err) {
    next(err);
  }
};

const deleteCatalogoDetalle = async (req, res, next) => {
  const { id } = req.params;

  try {
    const text = `
    UPDATE public.catalogo_detalle SET 
      estado = 'I'
    WHERE id in (${id})`;

    const query = { text };

    const catalogoDetalleEliminado = await pool.query(query);

    res.json(catalogoDetalleEliminado);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getCatalogos,
  createCatalogoCabecera,
  createCatalogoDetalle,
  updateCatalogoCabecera,
  updateCatalogoDetalle,
  deleteCatalogoCabecera,
  deleteCatalogoDetalle,
};
