const pool = require("../db");
const bcrypt = require("bcrypt");

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
      estado,
    } = req.body;

    try {
      const profesores = await pool.query(
        "SELECT * FROM public.Profesor WHERE cedula = $1",
        [cedula]
      );

      console.log("profesores.rows:");
      console.log(profesores.rows);

      if (profesores.rows.length > 0) {
        return res.json({
          detail: "Ya existe un profesor registrado con la cedula ingresada",
        });
      }

      console.log("chao");

      const nuevoProfesor = await pool.query(
        `INSERT INTO public.Profesor(
          cedula, nombre1, nombre2, apellido1, apellido2, cabecera_id, detalle_id, fecha_creacion, creado_por, estado)
        VALUES ($1, $2, $3, $4, $5, now(), $6, $7, $8, $9, $10);`,
        [cedula, nombre1, nombre2, apellido1, apellido2]
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
  const {
    email,
    pwd,
    alias,
    cabecera_id,
    detalle_id,
    creado_por,
    estado,
    modificado_por,
  } = req.body;

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(pwd, salt);

  try {
    const text = `
    UPDATE public.Profesor SET 
      email='${email}',
      hashed_pwd='${hashedPassword}',
      alias='${alias}',
      cabecera_id='${cabecera_id}', 
      creado_por='${creado_por}', 
      modificado_por = array_append(modificado_por, '${modificado_por}'),
      fecha_modificacion = array_append(fecha_modificacion, NOW()),
      estado='${estado}',
      detalle_id='${detalle_id}'
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
    console.log("deleting");

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
