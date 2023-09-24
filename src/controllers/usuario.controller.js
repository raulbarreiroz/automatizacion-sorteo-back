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
    const { email, alias } = req.body;

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
      const hashedPassword = bcrypt.hashSync("test", salt);

      console.log("salt");
      console.log(salt);
      console.log("hashedPassword");
      console.log(hashedPassword);

      const nuevoUsuario = await pool.query(
        `INSERT INTO public.usuario(
          email, hashed_pwd, alias, estado, rol_id)
        VALUES ($1, $2, $3,'A', 4);`,
        [email, hashedPassword, alias, rolId]
      );

      if (success) {
        res.json(nuevoUsuario);
      } else {
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
    const { email, alias } = req.body;

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
      const hashedPassword = bcrypt.hashSync("test", salt);

      console.log("salt");
      console.log(salt);
      console.log("hashedPassword");
      console.log(hashedPassword);

      const nuevoUsuario = await pool.query(
        `INSERT INTO public.usuario(
          email, alias, hashed_pwd, estado, rol_id)
        VALUES ($1, $2, null, 'A', 4);`,
        [email, alias]
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
  const { email, alias, borrarPwd, actualizarPwd } = req.body;

  if (borrarPwd) {
    try {
      const text = `
      UPDATE public.usuario SET 
        hashed_pwd= null    
      WHERE id in (${id})`;

      const query = { text };

      const usuarioEditado = await pool.query(query);

      res.json(usuarioEditado);
    } catch (err) {
      next(err);
    }
  } else if (actualizarPwd) {
    try {
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(actualizarPwd, salt);

      const text = `
      UPDATE public.usuario SET 
        hashed_pwd= '${hashedPassword}'  
      WHERE id in (${id})`;

      const query = { text };

      const usuarioEditado = await pool.query(query);

      res.json(usuarioEditado);
    } catch (err) {
      next(err);
    }
  } else {
    try {
      const text = `
      UPDATE public.usuario SET 
        email='${email}'      
      ,alias='${alias}'    
      WHERE id in (${id})`;

      const query = { text };

      const usuarioEditado = await pool.query(query);

      res.json(usuarioEditado);
    } catch (err) {
      next(err);
    }
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
      console.log("iniciando sesion");
      const users = await pool.query(
        "SELECT * FROM public.usuario WHERE email = $1 and estado = 'A'",
        [email]
      );

      console.log("users: ");
      console.log(users);
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
          const token = jwt.sign({ email }, "secret", {
            expiresIn: /*"10800s"*/ "108000s",
          });
          res.json({
            severity: "success",
            message: `Bienvenido ${aliasEncontrado}`,
            alias: aliasEncontrado,
            rolId,
            email,
            token,
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

const sesionIniciada = async (req, res, next) => {
  try {
    console.log("sesion iniciada?");
    const { cookies } = req.body;
    console.log("cookies: ");
    console.log(cookies);
    const token = cookies?.TOKEN;
    console.log("token: ");
    console.log(token);

    const decoded = jwt.decode(token, { complete: true });
    const expirationTime = decoded.payload.exp;
    const expirationDate = new Date(
      expirationTime * 1000 /* dates in js are in miliseconds */
    );
    console.log(expirationDate);

    const now = new Date();
    console.log(now);
    if (expirationDate?.getTime() <= now?.getTime()) {
      //console.log("sesion expirada");
      res.json({
        severity: "warning",
        message: "La sesion para el usuario expiro",
        sesionIniciada: false,
      });
    } else {
      //console.log("todabia en sesion");
      res.json({
        severity: "success",
        message: "Usuario con sesion activa",
        sesionIniciada: true,
      });
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
  sesionIniciada,
};
