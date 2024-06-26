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

    console.log("facultadId: ");
    console.log(facultadId);

    await pool.query(
      `INSERT INTO public.Carrera
          (nombre, estado, facultad_id)
        VALUES ($1, 'A', $2);`,
      [nombre, facultadId]
    );

    const nuevaCarrera = await pool.query(
      `SELECT currval(pg_get_serial_sequence('carrera','id'));`
    );

    console.log("nuevaCarreraId:");
    const nuevaCarreraId = nuevaCarrera?.rows[0]?.currval;

    console.log(nuevaCarreraId);

    await pool.query(
      `
INSERT INTO public.director(
	nombre, carrera_id)
	VALUES ($1, $2);
`,
      [directorNombre, nuevaCarreraId]
    );

    const nuevoDirector = await pool.query(
      `SELECT currval(pg_get_serial_sequence('director','id'));`
    );

    const nuevoDirectorId = nuevoDirector?.rows[0]?.currval;
    console.log(nuevoDirectorId);

    const nuevaCarreraEditada = await pool.query(
      `
      update carrera
      set director_id = ${nuevoDirectorId}
      where id in (${nuevaCarreraId})
      `
    );

    res.json(nuevaCarreraEditada);
  } catch (err) {
    next(err);
  }
};

const updateCarrera = async (req, res, next) => {
  const { id } = req.params;
  const { nombre, facultadId, directorNombre } = req.body;

  try {
    let text = `
    UPDATE public.carrera SET       
      nombre='${nombre}',
      facultad_id='${facultadId}' 
    WHERE id in (${id})`;
    let query = { text };
    let carreraEditada = await pool.query(query);

    text = `
    UPDATE public.director SET       
      nombre='${directorNombre}' 
    WHERE carrera_id in (${id})`;
    query = { text };
    let directorEditado = await pool.query(query);

    res.json({ carreraEditada, directorEditado });
  } catch (err) {
    next(err);
  }
};

const deleteCarrera = async (req, res, next) => {
  try {
    const { id } = req.params;

    try {
      let text = `
    UPDATE public.carrera SET 
      estado = 'I'
    WHERE id in (${id})`;
      query = { text };
      RegaloEliminado = await pool.query(query);

      text = `
    delete from public.director WHERE carrera_id in (${id})`;
      query = { text };
      DirectorEliminado = await pool.query(query);

      res.json({ RegaloEliminado, DirectorEliminado });
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getCarrerasSinFacultades,
  getCarreras,
  createCarrera,
  updateCarrera,
  deleteCarrera,
};
