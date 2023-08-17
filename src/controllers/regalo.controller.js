// si bien la tabla de regalos es un poco básico se podría categorizar o estandarizar
// conla ayuda de la tabla catalogo

const pool = require("../db");

// get de todos los Profesors
const getRegalos = async (req, res, next) => {
  try {
    const result = await pool.query(
      "SELECT * FROM regalo WHERE estado in ('A')"
    );
    return res.json(result.rows);
  } catch (err) {
    next(err);
  }
};

const createRegalo = async (req, res, next) => {
  try {
    const { nombre, imagen, auspiciante, creadoPor } = req.body;

    try {
      const nuevoRegalo = await pool.query(
        `INSERT INTO regalo (nombre, imagen, auspiciante, creado_por, fecha_creacion, estado)
        VALUES ($1, $2, $3, $4, now(), 'A');`,
        [nombre, imagen, auspiciante, creadoPor]
      );

      res.json(nuevoRegalo);
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    next(err);
  }
};

// update catalogo_cabecera
const updateRegalo = async (req, res, next) => {
  const { id } = req.params;
  const { nombre, imagen, auspiciante } = req.body;

  try {
    const text = `
    UPDATE public.regalo SET 
      nombre='${nombre}',
      imagen=NULL,
      auspiciante='${auspiciante}'      
    WHERE id in (${id})`;

    const query = { text };

    const RegaloEditado = await pool.query(query);

    res.json(RegaloEditado);
  } catch (err) {
    next(err);
  }
};

const deleteRegalo = async (req, res, next) => {
  try {
    const { id } = req.params;

    try {
      const text = `
    UPDATE public.regalo SET 
      estado = 'I'
    WHERE id in (${id})`;

      const query = { text };

      const RegaloEliminado = await pool.query(query);

      res.json(RegaloEliminado);
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getRegalos,
  createRegalo,
  updateRegalo,
  deleteRegalo,
};
