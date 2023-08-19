const express = require("express");
const { v4: uuidv4 } = require("uuid");
const cors = require("cors");

const jwt = require("jsonwebtoken");

const testRoutes = require("./routes/test.routes");
const usuarioRoutes = require("./routes/usuario.routes");
const catalogoRoutes = require("./routes/catalogo.routes");
const profesorRoutes = require("./routes/profesor.routes");
const regaloRoutes = require("./routes/regalo.routes");
const sorteoRoutes = require("./routes/sorteo.routes");

const PORT = process.env.PORT ?? 8000;
const app = express();

app.use(express.json());

// habilitar conexion entre servicios webs con puertos distintos
app.use(cors());

// llamar rutas
app.use(testRoutes);
app.use(usuarioRoutes);
app.use(catalogoRoutes);
app.use(profesorRoutes);
app.use(regaloRoutes);
app.use(sorteoRoutes);

app.use((err, req, res, next) => {
  return res.json({
    message: err.message,
  });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(
    `Servidor de automatizacion de sorteo iniciado en http://localhost:${PORT}`
  );
});
