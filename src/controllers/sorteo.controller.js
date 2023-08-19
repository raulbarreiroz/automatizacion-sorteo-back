const pool = require("../db");
// get de todos los sorteos
const getSorteos = async (req, res, next) => {
  try {
    const sorteos = [];
    const result = await pool.query(
      "SELECT * FROM public.sorteo WHERE estado in ('A')"
    );
    if (result?.rows) {
      for (r of result?.rows) {
        console.log(r);
        let profesores = [];
        let regalos = [];

        if (r) {
          console.log(r);
          let profesores = [];
          let regalos = [];

          if (r) {
            console.log(r);
            // conseguir profesores para sorteo
            if (r?.lista_profesores) {
              const profesoresQuery = { text: r?.lista_profesores };
              const profesoresQueryResult = await pool.query(profesoresQuery);
              if (profesoresQueryResult?.rows)
                profesores = profesoresQueryResult?.rows;
            }

            // conseguir regalos para sorteo
            if (r?.lista_regalos) {
              const regalosQuery = { text: r?.lista_regalos };
              const regalosQueryResult = await pool.query(regalosQuery);
              if (regalosQueryResult?.rows) regalos = regalosQueryResult?.rows;
            }
          }

          sorteos.push({
            id: r.id,
            nombre: r.nombre,
            creado_por: r?.creado_por,
            fecha_creacion: r?.fecha_creacion,
            profesores: profesores,
            regalos: regalos,
          });
        }
      }
    }
    res.json(sorteos);
  } catch (err) {
    next(err);
  }
};

// sorteo
const getSorteo = async (req, res, next) => {
  const { id } = req.params;
  try {
    const text = `
      SELECT * from sorteo 
      WHERE estado in ('A') and id=${id}`;

    const query = { text };

    const sorteo = await pool.query(query);
    let profesores = [];
    let regalos = [];

    if (sorteo?.rows[0]) {
      console.log(sorteo?.rows);
      // conseguir profesores para sorteo
      if (sorteo?.rows[0]?.lista_profesores) {
        const profesoresrQuery = { text: sorteo?.rows[0]?.lista_profesores };
        const profesorresQueryResult = await pool.query(profesorQuery);
        if (profesorQueryResult?.rows) profesores = profesorQueryResult?.rows;
      }

      // conseguir regalos para sorteo
      if (sorteo?.rows[0]?.lista_regalos) {
        const profesorQuery = { text: sorteo?.rows[0]?.lista_regalos };
        const regalosQueryResult = await pool.query(regalosQueryResult);
        if (regalosQueryResult?.rows) regalos = await pool.query(profesorQuery);
      }
    }

    res.json({
      sorteo: sorteo?.rows,
      profesores: profesores?.rows,
      regalos: regalos?.rows,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

// create sorteo
const createSorteo = async (req, res, next) => {
  try {
    const { email, pwd, alias, cabeceraId, detalleId, creadoPor } = req.body;

    try {
      const users = await pool.query(
        "SELECT * FROM public.usuario WHERE email = $1",
        [email]
      );

      console.log("users.rows:");
      console.log(users.rows);

      if (users.rows.length > 0) {
        return res.json({
          detail: "El email que desea registrar ya se encuentra en uso",
        });
      }

      console.log("chao");
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(pwd, salt);
      console.log(hashedPassword);

      const nuevoUsuario = await pool.query(
        `INSERT INTO public.usuario(
          email, hashed_pwd, alias, cabecera_id, creado_por, fecha_creacion, estado, detalle_id)
        VALUES ($1, $2, $3, $4, $5, now(), $6, $7);`,
        [email, hashedPassword, alias, cabeceraId, creadoPor, "A", detalleId]
      );

      res.json(nuevoUsuario);
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    next(err);
  }
};

// update catalogo_cabecera
const updateUsuario = async (req, res, next) => {
  const { id } = req.params;
  const { email, pwd, alias, cabeceraId, detalleId, modificadoPor } = req.body;

  let hashedPassword = "";

  if (pwd) {
    const salt = bcrypt.genSaltSync(10);
    hashedPassword = bcrypt.hashSync(pwd, salt);
  }

  try {
    const text = `
    UPDATE public.usuario SET 
      email='${email}'
      ${hashedPassword !== "" ? ",hashed_pwd: " + hashedPassword : ""}      
     ,alias='${alias}',
      cabecera_id='${cabeceraId}',             
      detalle_id='${detalleId}'
    WHERE id in (${id})`;

    const query = { text };

    const usuarioEditado = await pool.query(query);

    res.json(usuarioEditado);
  } catch (err) {
    next(err);
  }
};

const deleteUsuario = async (req, res, next) => {
  try {
    const { id } = req.params;

    try {
      const text = `
    UPDATE public.usuario SET 
      estado = 'I'
    WHERE id in (${id})`;

      const query = { text };

      const usuarioEliminado = await pool.query(query);

      res.json(usuarioEliminado);
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getSorteos,
  getSorteo,
};
