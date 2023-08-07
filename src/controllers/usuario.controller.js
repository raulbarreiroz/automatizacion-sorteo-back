const pool = require("../db");
const bcrypt = require("bcrypt");

// get de todos los usuarios
const getUsuarios = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM usuario WHERE estado in ('A')"
    );
    return res.json(result.rows);
  } catch (err) {
    console.log(err);
    console.log(err.detail);
  }
};

// create usuario
const createUsuario = async (req, res) => {
  try {
    const { email, pwd, alias, cabecera_id, detalle_id, creado_por } = req.body;

    try {
      const users = await pool.query(
        "SELECT * FROM public.usuario WHERE email = $1",
        [email]
      );

      console.log("users.rows:");
      console.log(users.rows);

      if (users.rows.length > 0) {
        console.log("hola");
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
        [email, hashedPassword, alias, cabecera_id, creado_por, "A", detalle_id]
      );

      res.json(nuevoUsuario);
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
};

// update catalogo_cabecera
const updateUsuario = async (req, res) => {
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
    UPDATE public.usuario SET 
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

    const usuarioEditado = await pool.query(query);

    res.json(usuarioEditado);
  } catch (err) {
    console.log(err);
  }
};

const deleteUsuario = async (req, res) => {
  try {
    console.log("deleting");

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
    console.log(err);
  }
};

module.exports = {
  getUsuarios,
  createUsuario,
  updateUsuario,
  deleteUsuario,
};
