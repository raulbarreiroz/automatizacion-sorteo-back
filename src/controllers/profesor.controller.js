const pool = require("../db");

// get de todos los Profesors
const getProfesores = async (req, res, next) => {
  try {
    const result = await pool.query(
      `
SELECT  
  cedula,
  nombre1,
  nombre2,
  apellido1,
  apellido2,
  facultad_id,
  imagen,
  asistio
FROM profesor WHERE estado in ('A')
order by nombre1, nombre2, apellido1, apellido2
`
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
      facultadId,
      imagen,
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

      const text = `INSERT INTO public.Profesor(
        cedula, nombre1, nombre2, apellido1, apellido2, facultad_id , estado, asistio, imagen)
      VALUES (${cedula}, '${nombre1}', '${nombre2}', '${apellido1}', '${apellido2}', ${facultadId}, 'A', 'NO' ,${
        imagen ? `'${imagen}'` : "null"
      });`;

      console.log(text);

      const query = { text };

      const nuevoProfesor = await pool.query(query);
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
    cedula,
    nombre1,
    nombre2,
    apellido1,
    apellido2,
    facultadId,
    imagen,
    asistio,
  } = req.body;

  try {
    const text = `
    UPDATE public.Profesor SET       
      nombre1='${nombre1}',
      nombre2='${nombre2}',
      apellido1='${apellido1}',
      apellido2='${apellido2}',  
      facultad_id=${facultadId},
      imagen='${imagen}',
      asistio='${asistio}'
    WHERE cedula in ('${cedula}')`;

    console.log(text);

    const query = { text };

    const ProfesorEditado = await pool.query(query);

    console.log(ProfesorEditado);

    res.json(ProfesorEditado);
  } catch (err) {
    next(err);
  }
};

const asignarRegalo = async (req, res, next) => {
  const { id } = req.params;
  const { regaloId } = req.body;

  console.log("asignarRegalo");

  try {
    const text = `
    UPDATE public.Profesor SET       
      regalo_id=${regaloId}
    WHERE cedula in ('${id}')`;

    console.log(text);

    const query = { text };

    const ProfesorEditado = await pool.query(query);

    console.log(ProfesorEditado);

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
    WHERE cedula in ('${id}')`;

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
  asignarRegalo,
};
