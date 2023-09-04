const pool = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// get de todos los usuarios
const getUsuarios = async (req, res, next) => {
  try {
    const result = await pool.query(
      "SELECT id, email, hashed_pwd, alias, rol_id FROM public.usuario WHERE estado in ('A')"
    );
    return res.json(result.rows);
  } catch (err) {
    next(err);
  }
};

// create usuario
const createUsuario = async (req, res, next) => {
  try {
    const { email, pwd, alias, rolId } = req.body;

    console.log("creando usuario");

    try {
      const users = await pool.query(
        "SELECT * FROM public.usuario WHERE email = $1 and estado = 'A'",
        [email]
      );

      console.log("users.rows:");
      console.log(users.rows);

      if (users?.rows?.length > 0) {
        return res.json({
          detail: "El email que desea registrar ya se encuentra en uso",
        });
      }

      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(pwd, salt);

      console.log("salt");
      console.log(salt);
      console.log("hashedPassword");
      console.log(hashedPassword);

      const nuevoUsuario = await pool.query(
        `INSERT INTO public.usuario(
          email, hashed_pwd, alias, estado, rol_id)
        VALUES ($1, $2, $3,'A', $4);`,
        [email, hashedPassword, alias, rolId]
      );

      if (success) {
        console.log("pwd correcot");
        const token = jwt.sign({ email }, "secret", { expiresIn: "10s" });
        res.json({
          severity: "success",
          message: `Bienvenido ${aliasEncontrado}`,
          alias,
          rolId: 2,
          email,
          token,
          expires: "10s",
        });
      } else {
        console.log("contrasena incorrecta");
        res.json({
          severity: "error",
          message: "Problema al crear usuario",
        });
      }
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    next(err);
  }
};

const createGestor = async (req, res, next) => {
  try {
    const { email, pwd, alias, rolId } = req.body;

    console.log("creando usuario");

    try {
      const users = await pool.query(
        "SELECT * FROM public.usuario WHERE email = $1 and estado = 'A'",
        [email]
      );

      console.log("users.rows:");
      console.log(users.rows);

      if (users?.rows?.length > 0) {
        return res.json({
          detail: "El email que desea registrar ya se encuentra en uso",
        });
      }

      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(pwd, salt);

      console.log("salt");
      console.log(salt);
      console.log("hashedPassword");
      console.log(hashedPassword);

      const nuevoUsuario = await pool.query(
        `INSERT INTO public.usuario(
          email, hashed_pwd, alias, estado, rol_id)
        VALUES ($1, $2, $3,'A', $4);`,
        [email, hashedPassword, alias, rolId]
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
  const { email, pwd, alias, rolId } = req.body;

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
      rol_id=${rolId}
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

const inciarSesion = async (req, res, next) => {
  try {
    const { email, pwd, alias } = req.body;

    console.log("iniciando sesion");

    try {
      const users = await pool.query(
        "SELECT * FROM public.usuario WHERE email = $1 and estado = 'A'",
        [email]
      );

      if (users?.rows?.length === 0) {
        console.log("USUARIO NO EXISTE");
        res.json({
          severity: "error",
          message: "EMAIL ingresado no registrado",
        });
      } else {
        console.log("USUARIO EXISTE");
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(pwd, salt);

        const usuarioEncontrado = users?.rows[0];
        const hashedPwdEncontrada = usuarioEncontrado?.hashed_pwd;
        const aliasEncontrado = usuarioEncontrado?.alias;
        const rolId = usuarioEncontrado?.rol_id;

        const success = await bcrypt.compare(pwd, hashedPwdEncontrada);

        if (success) {
          console.log("pwd correcot");
          const token = jwt.sign({ email }, "secret", { expiresIn: "10s" });
          res.json({
            severity: "success",
            message: `Bienvenido ${aliasEncontrado}`,
            alias: aliasEncontrado,
            rolId,
            email,
            token,
            expires: "10s",
          });
        } else {
          console.log("contrasena incorrecta");
          res.json({
            severity: "error",
            message: "CONTRASEÑA ingresada incorrecta",
          });
        }
      }
      //res.json(nuevoUsuario);
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
  createGestor,
  updateUsuario,
  deleteUsuario,
  inciarSesion,
  createGestor,
};
