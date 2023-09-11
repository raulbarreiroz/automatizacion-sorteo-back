const pool = require("../db");
// get de todos los sorteos
const getTiposDeDonaciones = async (req, res, next) => {
  try {
    const result = await pool.query(`
select 
	t.*				
from tipo_donacion t
where t.estado = 'A'
order by id
    `);

    const tipoDeDonaciones = result?.rows;
    res.json(tipoDeDonaciones?.length ? tipoDeDonaciones : []);
  } catch (err) {
    next(err);
  }
};

const createTipoDeDonacion = async (req, res, next) => {
  try {
    const { nombre, descripcion } = req.body;

    const nuevoTipoDonacion = await pool.query(
      `INSERT INTO public.tipo_donacion
          (nombre, descripcion, estado)
        VALUES ($1, $2, 'A');`,
      [nombre, descripcion]
    );

    res.json(nuevoTipoDonacion);
  } catch (err) {
    next(err);
  }
};

const updateTipoDeDonacion = async (req, res, next) => {
  const { id } = req.params;
  const { nombre, descripcion } = req.body;

  try {
    let text = `
    UPDATE public.tipo_donacion SET       
      nombre='${nombre}',
      descripcion='${descripcion}' 
    WHERE id in (${id})`;
    let query = { text };
    let tipoEdicionEditado = await pool.query(query);

    res.json(tipoEdicionEditado);
  } catch (err) {
    next(err);
  }
};

const deleteTipoDeDonacion = async (req, res, next) => {
  try {
    const { id } = req.params;

    try {
      let text = `
    UPDATE public.tipo_donacion SET 
      estado = 'I'
    WHERE id in (${id})`;
      query = { text };
      tipoDonacionEliminado = await pool.query(query);

      res.json(tipoDonacionEliminado);
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getTiposDeDonaciones,
  updateTipoDeDonacion,
  createTipoDeDonacion,
  deleteTipoDeDonacion,
};
