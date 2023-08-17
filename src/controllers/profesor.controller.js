const pool = require("../db");

// get de todos los Profesors
const getProfesores = async (req, res, next) => {
  try {
    const result = await pool.query(
      "SELECT * FROM profesor WHERE estado in ('A')"
    );
    return res.json(result.rows);
  } catch (err) {
    next(err);
  }
};

// create Profesor
const createProfesor = async (req, res, next) => {
  try {
    const {
      cedula,
      nombre1,
      nombre2,
      apellido1,
      apellido2,
      cabeceraId,
      detalleId,
      creadoPor,
    } = req.body;

    try {
      const profesores = await pool.query(
        "SELECT * FROM public.Profesor WHERE cedula = $1 and estado='A'",
        [cedula]
      );

      if (profesores.rows.length > 0) {
        return res.json({
          detail: "Ya existe un profesor registrado con la cedula ingresada",
        });
      }

      const nuevoProfesor = await pool.query(
        `INSERT INTO public.Profesor(
          cedula, nombre1, nombre2, apellido1, apellido2, cabecera_id, detalle_id, fecha_creacion, creado_por, estado)
        VALUES ($1, $2, $3, $4, $5, $6, $7, now(), $8, 'A');`,
        [
          cedula,
          nombre1,
          nombre2,
          apellido1,
          apellido2,
          cabeceraId,
          detalleId,
          creadoPor,
        ]
      );

      res.json(nuevoProfesor);
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    next(err);
  }
};

// update catalogo_cabecera
const updateProfesor = async (req, res, next) => {
  const { id } = req.params;
  const { cedula, nombre1, nombre2, apellido1, apellido2, detalleId } =
    req.body;

  try {
    const text = `
    UPDATE public.Profesor SET 
      cedula='${cedula}',
      nombre1='${nombre1}',
      nombre2='${nombre2}',
      apellido1='${apellido1}',
      apellido2='${apellido2}',  
      detalle_id=${detalleId}      
    WHERE id in (${id})`;

    const query = { text };

    const ProfesorEditado = await pool.query(query);

    res.json(ProfesorEditado);
  } catch (err) {
    next(err);
  }
};

const deleteProfesor = async (req, res, next) => {
  try {
    const { id } = req.params;

    try {
      const text = `
    UPDATE public.Profesor SET 
      estado = 'I'
    WHERE id in (${id})`;

      const query = { text };

      const ProfesorEliminado = await pool.query(query);

      res.json(ProfesorEliminado);
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getProfesores,
  createProfesor,
  updateProfesor,
  deleteProfesor,
};
