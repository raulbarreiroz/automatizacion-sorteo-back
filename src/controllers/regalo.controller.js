// si bien la tabla de regalos es un poco básico se podría categorizar o estandarizar
// conla ayuda de la tabla catalogo

// falta arreglar el tema de imagenes

const pool = require("../db");

// get de todos los Profesors
const getRegalos = async (req, res, next) => {
  try {
    const result = await pool.query(`
select r.id, r.nombre, r.imagen, r.estado, r.tipo_donacion_id, r.facultad_id, r.nombre_donador,
	t.nombre as nombre_donacion, t.descripcion
from regalo r
left join tipo_donacion t
	on r.tipo_donacion_id = t.id
where r.estado = 'A' and t.estado = 'A'
    `);
    return res.json(result.rows);
  } catch (err) {
    next(err);
  }
};

// TODO: este CRUD hay que ahacerlo mientras se hace la parte visual

const createRegalo = async (req, res, next) => {
  try {
    let { nombre, tipoDonacionId, facultadId, nombreDonador } = req.body;

    facultadId = facultadId === "" ? "NULL" : facultadId;

    try {
      const nuevoRegalo = await pool.query(
        `INSERT INTO regalo (nombre, tipo_donacion_id, facultad_id, nombre_donador, estado)
        VALUES ($1, $2, $3, $4, 'A');`,
        [nombre, tipoDonacionId, facultadId, nombreDonador]
      );
      console.log(nuevoRegalo);
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
  let { nombre, imagen, facultadId, tipoDonacionId, nombreDonador } =
    req.body;

  facultadId = facultadId === "" ? "NULL" : facultadId;
  
  console.log(nombre, imagen, facultadId, tipoDonacionId, nombreDonador);
  try {
    const text = `
    UPDATE public.regalo SET 
      nombre='${nombre}',
      imagen=NULL,
      facultad_id=${facultadId},
      tipo_donacion_id=${tipoDonacionId},
      nombre_donador='${nombreDonador}'      
    WHERE id in (${id})`;

    console.log(text);

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
