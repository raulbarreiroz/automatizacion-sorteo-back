const pool = require("../db");

// get de todos los catalogos con sus detalles
const getAutoridades = async (req, res, next) => {
  try {
    const autoridades = await pool.query(`select 
cabecera.*,
(
  select json_agg(
    json_build_object(
      'id', id, 
      'nombre',nombre, 
      'descripcion',descripcion, 
      'imagen',imagen,
      'institucion_id',institucion_id,
      'estado',estado
    ) 
  ) as detalles
  from autoridad_detalle detalle
  where detalle.autoridad_cabecera_id = cabecera.id
    and detalle.estado = 'A'
)
from autoridad_cabecera cabecera
WHERE cabecera.estado='A'`);
    return res.json(autoridades.rows);
  } catch (err) {
    next(err);
  }
};

// get de catalogopor id con sus detalles
const getAutoridad = async (req, res, next) => {
  const { id } = req.params;
  try {
    const autoridad = await pool.query(`select 
cabecera.*,
(
  select json_agg(
    json_build_object(
      'id', id, 
      'nombre',nombre, 
      'descripcion',descripcion, 
      'imagen',imagen,
      'institucion_id',institucion_id,
      'estado',estado
    ) 
  ) as detalles
  from autoridad_detalle detalle
  where detalle.cabecera_id = cabecera.id
    and detalle.estado = 'A'
)
from autoridad_cabecera cabecera
WHERE id = ${id} AND cabecera.estado='A'`);
    return res.json(autoridad.rows);
  } catch (err) {
    next(err);
  }
};

// create catalogo_cabecera
const createAutoridadCabecera = async (req, res, next) => {
  const { nombre, descripcion } = req.body;

  try {
    const autoridadCabecera = await pool.query(
      `INSERT INTO public.autoridad_cabecera(
      nombre, descripcion, estado)
      VALUES ($1, $2, 'A');`,
      [nombre, descripcion]
    );
    res.json(autoridadCabecera);
  } catch (err) {
    next(err);
  }
};

// create catalogo_detalle
const createAutoridadDetalle = async (req, res, next) => {
  const { nombre, descripcion, imagen, institucionId, autoridadCabeceraId } =
    req.body;
  try {
    const autoridadDetalle = await pool.query(
      `INSERT INTO public.autoridad_detalle(
      nombre, descripcion, imagen, institucion_id, estado, autoridad_cabecera_id)
      VALUES ($1, $2, $3, $4, 'A', $5);`,
      [nombre, descripcion, imagen, institucionId, autoridadCabeceraId]
    );
    res.json(autoridadDetalle);
  } catch (err) {
    next(err);
  }
};

// update catalogo_cabecera
const updateAutoridadCabecera = async (req, res, next) => {
  const { id } = req.params;
  const { nombre, descripcion, estado } = req.body;

  try {
    const text = `
    UPDATE public.autoridad_cabecera SET 
      nombre = '${nombre}', 
      descripcion = '${descripcion}',      
      estado = '${estado}'
    WHERE id in (${id})`;

    const query = { text };

    const autoridadCabeceraEditado = await pool.query(query);

    res.json(autoridadCabeceraEditado);
  } catch (err) {
    next(err);
  }
};

// update catalogo_detalle
const updateAutoridadDetalle = async (req, res, next) => {
  const { id } = req.params;
  const { nombre, descripcion, imagen, institucionId, estado } = req.body;

  try {
    const newValues = {
      nombre,
      descripcion,
    };
    const text = `
    UPDATE public.autoridad_detalle SET 
      nombre = '${nombre}', 
      descripcion = '${descripcion}',
      imagen='${imagen}',
      institucion_id='${institucionId}',
      estado='${estado}'
    WHERE id in (${id})`;

    const query = { text };

    const autoridadDetalleEditado = await pool.query(query);

    res.json(autoridadDetalleEditado);
  } catch (err) {
    next(err);
  }
};

const deleteAutoridadCabecera = async (req, res, next) => {
  const { id } = req.params;

  try {
    const text = `
    UPDATE public.autoridad_cabecera SET 
      estado = 'I'
    WHERE id in (${id})`;

    const query = { text };

    const autoridadCabeceraEliminado = await pool.query(query);

    res.json(autoridadCabeceraEliminado);
  } catch (err) {
    next(err);
  }
};

const deleteAutoridadDetalle = async (req, res, next) => {
  const { id } = req.params;

  try {
    const text = `
    UPDATE public.autoridad_detalle SET 
      estado = 'I'
    WHERE id in (${id})`;

    const query = { text };

    const autoridadDetalleEliminado = await pool.query(query);

    res.json(autoridadDetalleEliminado);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAutoridades,
  getAutoridad,

  createAutoridadCabecera,
  createAutoridadDetalle,
  updateAutoridadCabecera,
  updateAutoridadDetalle,
  deleteAutoridadCabecera,
  deleteAutoridadDetalle,
};
