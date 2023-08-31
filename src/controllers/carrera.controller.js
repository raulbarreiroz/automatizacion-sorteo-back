const pool = require("../db");
// get de todos los sorteos
const getCarrerasSinFacultades = async (req, res, next) => {
  try {
    const result = await pool.query(`
select * from carrera
where estado = 'A'
  and facultad_id is null      
    `);

    const facultades = result?.rows;
    res.json(facultades?.length ? facultades : []);
  } catch (err) {
    next(err);
  }
};

const getCarreras = async (req, res, next) => {
  try {
    const result = await pool.query(`
select * from carrera
where estado = 'A'    
    `);

    const facultades = result?.rows;
    res.json(facultades?.length ? facultades : []);
  } catch (err) {
    next(err);
  }
};

const createCarrera = async (req, res, next) => {
  try {
    const { nombre, directorNombre, facultadId } = req.body;

    const nuevaCarrera = await pool.query(
      `INSERT INTO public.Carrera
          (nombre, estado, facultad_id)
        VALUES ($1, 'A', $2);`,
      [nombre, facultadId]
    );

    const ultimaCarreraCreada = await pool.query(
      `
SELECT * FROM CARRERA ORDER BY ID DESC
      `
    );

    const nuevaCarreraId = ultimaCarreraCreada?.rows[0].id;

    const nuevoDirector = await pool.query(
      `
INSERT INTO public.director(
	nombre, carrera_id)
	VALUES ($1, $2);
`,
      [directorNombre, nuevaCarreraId]
    );

    const ultimoDirectorCreado = await pool.query(
      `
SELECT * FROM DIRECTOR ORDER BY ID DESC
      `
    );

    const nuevoDirectorId = ultimoDirectorCreado?.rows[0].id;

    console.log("nuevaCarrearId");
    console.log(nuevaCarreraId);

    console.log("nuevoDirectorId");
    console.log(nuevoDirectorId);

    let CarreraEditada = {};

    try {
      const text = `
      UPDATE public.CARRERA SET           
        director_id=${nuevoDirectorId}
      WHERE id in (${nuevaCarreraId})`;
      const query = { text };
      CarreraEditada = await pool.query(query);
    } catch (err) {
      next(err);
    }

    console.log("CarreraEdiatada");
    console.log(CarreraEditada);

    res.json(CarreraEditada);
  } catch (err) {
    next(err);
  }
};

const updateCarrera = async (req, res, next) => {
  try {
    const { nombre, directorNombre, facultadId } = req.body;

    const nuevaCarrera = await pool.query(
      `INSERT INTO public.Carrera
          (nombre, estado, facultad_id)
        VALUES ($1, 'A', $2);`,
      [nombre, facultadId]
    );

    res.json(nuevaCarrera);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getCarrerasSinFacultades,
  getCarreras,
  createCarrera,
};
