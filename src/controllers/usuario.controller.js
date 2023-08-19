const pool = require("../db");
const bcrypt = require("bcrypt");

// get de todos los usuarios
const getUsuarios = async (req, res, next) => {
  try {
    const result = await pool.query(
      "SELECT alias, cabecera_id, creado_por, detalle_id, email, estado, fecha_creacion, fecha_modificacion, id, modificado_por FROM public.usuario WHERE estado in ('A')"
    );
    return res.json(result.rows);
  } catch (err) {
    next(err);
  }
};

// create usuario
const createUsuario = async (req, res, next) => {
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
  getUsuarios,
  createUsuario,
  updateUsuario,
  deleteUsuario,
};
