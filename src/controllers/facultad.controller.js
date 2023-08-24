const pool = require("../db");
// get de todos los sorteos
const getFacultades = async (req, res, next) => {
  try {
    const result = await pool.query(`
select facultad.*,
(
  select json_agg(
    json_build_object(
      'id', id, 
      'nombre',nombre, 
      'director',director            
    ) 
  ) as carreras
  from carrera carrera
  where facultad.id = carrera.facultad_id and carrera.estado = 'A'    
),
(
  select json_agg(
    json_build_object(
      	'id', id, 
      	'nombre1',nombre1, 
      	'nombre2',nombre2,
	  	'apellido1',apellido1,
		'apellido2',apellido2,
		'cedula',cedula,
		'nombre_completo',nombre1 || ' ' || nombre2 || ' ' || apellido1 || ' ' || apellido2
    ) 
  ) as profesores
  from profesor profesor
  where facultad.id = profesor.facultad_id and profesor.estado = 'A'    
)
from facultad facultad
WHERE facultad.estado='A'    
    `);

    const facultades = result?.rows;
    res.json(facultades?.length ? facultades : []);
  } catch (err) {
    next(err);
  }
};

const getTiposDeDonaciones = async (req, res, next) => {
  try {
    const result = await pool.query(`
select 
	t.*				
from tipo_donacion t
where t.estado = 'A'
    `);

    const tipoDeDonaciones = result?.rows;
    res.json(tipoDeDonaciones?.length ? tipoDeDonaciones : []);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getFacultades,
  getTiposDeDonaciones,
};
