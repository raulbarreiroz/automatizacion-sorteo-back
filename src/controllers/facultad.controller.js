const pool = require("../db");

const getFacultades = async (req, res, next) => {
  try {
    const result = await pool.query(`
    select facultad.*,
    (
      select 
        json_build_object(
          'id', id, 
          'nombre', nombre,
        'descripcion', descripcion,
        'detalle', (
          select 
          json_build_object(
            'id', id,
            'nombre', nombre,
            'imagen', imagen				
          )       
          from autoridad_detalle det
          where det.institucion_id = facultad.id
          AND det.estado = 'A'    
          AND det.autoridad_cabecera_id = cab.id
        )
        ) 
        as autoridades
        FROM AUTORIDAD_CABECERA CAB		
      WHERE CAB.ID = 1 -- decano   	
        AND CAB.estado = 'A'    
    ),
    (
      select json_agg(
        json_build_object(
          'id', id, 
          'nombre',nombre, 
          'director_id',director_id            
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
        'nombre_completo',nombre1 || ' ' || nombre2 || ' ' || apellido1 || ' ' || apellido2,
        'asistio',asistio,
        'regalo_id',regalo_id,
        'imagen',imagen
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

// create Facultad
const createFacultad = async (req, res, next) => {
  try {
    const { nombre, decanoNombre, color, logo, carreras } = req.body;

    const nuevaFacultad = await pool.query(
      `INSERT INTO public.Facultad(
           nombre, estado, color, logo)
        VALUES ($1, 'A', $2, $3 
        );`,
      [nombre, color, logo || ""]
    );

    const ultimaFAcultadCreada = await pool.query(
      `
SELECT * FROM FACULTAD ORDER BY ID DESC
      `
    );

    const nuevaFacultadId = ultimaFAcultadCreada?.rows[0].id;

    const nuevoDecano = await pool.query(
      `
INSERT INTO public.decano(
	nombre, facultad_id)
	VALUES ($1, $2);
`,
      [decanoNombre, nuevaFacultadId]
    );

    const ultimoDecanoCreado = await pool.query(
      `
SELECT * FROM DECANO ORDER BY ID DESC
      `
    );

    const nuevoDecanoId = ultimoDecanoCreado?.rows[0].id;

    for (const carrera of carreras) {
      console.log(carrera);
      console.log(nuevaFacultadId);
      const carreraId = carrera?.id;
      try {
        const text = `
        UPDATE public.Carrera SET           
          facultad_id=${nuevaFacultadId}
        WHERE id in (${carreraId})`;
        const query = { text };
        const CarreraEditada = await pool.query(query);
      } catch (err) {
        next(err);
      }
    }

    let FacultadEditada = {};

    try {
      const text = `
      UPDATE public.FACULTAD SET           
        decano_id=${nuevoDecanoId}
      WHERE id in (${nuevaFacultadId})`;
      const query = { text };
      FacultadEditada = await pool.query(query);
    } catch (err) {
      next(err);
    }

    res.json(FacultadEditada);
  } catch (err) {
    next(err);
  }
};

const updateFacultad = async (req, res, next) => {
  const { id } = req.params;
  const { nombre, decanoNombre, decanoFacultadId, color, logo } = req.body;

  console.log(nombre, decanoNombre, decanoFacultadId, color, logo);

  try {
    let text = `
    UPDATE public.FACULTAD SET       
      nombre='${nombre}',      
      color='${color}',
      logo='${logo}'       
    WHERE id in (${id})`;

    let query = { text };
    const ProfesorEditado = await pool.query(query);

    console.log(ProfesorEditado);

    text = `
    UPDATE public.DECANO SET       
      nombre='${decanoNombre}'               
    WHERE id in (${decanoFacultadId})`;

    query = { text };
    const DecanoEditado = await pool.query(query);

    res.json({ ProfesorEditado, DecanoEditado });
  } catch (err) {
    next(err);
  }
};

const deleteFacultad = async (req, res, next) => {
  try {
    const { id } = req.params;

    try {
      const text = `
    UPDATE public.FACULTAD SET 
      estado = 'I'
    WHERE id in (${id})`;

      const query = { text };

      const FacultadEliminado = await pool.query(query);

      console.log("hola");
      console.log();

      res.json(FacultadEliminado);
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createFacultad,
  getFacultades,
  updateFacultad,
  deleteFacultad,
};
