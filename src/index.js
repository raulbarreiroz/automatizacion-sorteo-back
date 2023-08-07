const express = require("express");
const { v4: uuidv4 } = require("uuid");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const testRoutes = require("./routes/test.routes");
const usuarioRoutes = require("./routes/usuario.routes");

const PORT = process.env.PORT ?? 8000;
const app = express();

app.use(express.json());

// habilitar conexion entre servicios webs con puertos distintos
app.use(cors());

// llamar rutas
app.use(testRoutes);
app.use(usuarioRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(
    `Servidor de automatizacion de sorteo iniciado en http://localhost:${PORT}`
  );
});
