const express = require("express");
const { v4: uuidv4 } = require("uuid");
const cors = require("cors");

const jwt = require("jsonwebtoken");

// mongo section
// multer
const fs = require("file-system");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;
const multer = require("multer");
const myurl =
  "mongodb+srv://imagenes:j6IrrOP5bkv5Hp92@cluster0.llnbdqj.mongodb.net/?retryWrites=true&w=majority";

// SET STORAGE
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

var upload = multer({ storage: storage });

// fin de mongo section

const testRoutes = require("./routes/test.routes");
const usuarioRoutes = require("./routes/usuario.routes");
const catalogoRoutes = require("./routes/catalogo.routes");
const profesorRoutes = require("./routes/profesor.routes");
const regaloRoutes = require("./routes/regalo.routes");
const sorteoRoutes = require("./routes/sorteo.routes");
const carrerasRoutes = require("./routes/carrera.routes");
const tipoDeDonacionRoutes = require("./routes/tipoDeDonacion.routes");
const facultadRoutes = require("./routes/facultad.routes");
const decanoRoutes = require("./routes/decano.routes");
const directorRoutes = require("./routes/director.routes");

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
app.use(facultadRoutes);
app.use(carrerasRoutes);
app.use(tipoDeDonacionRoutes);
app.use(decanoRoutes);
app.use(directorRoutes);

app.use((err, req, res, next) => {
  return res.json({
    message: err.message,
  });
});

app.post("/uploadphoto", upload.single("picture"), (req, res) => {
  var img = fs.readFileSync(req.file.path);
  var encode_image = img.toString("base64");
  // Define a JSONobject for the image attributes for saving to database

  var finalImg = {
    contentType: req.file.mimetype,
    image: new Buffer(encode_image, "base64"),
  };
  db.collection("quotes").insertOne(finalImg, (err, result) => {
    console.log(result);
    if (err) return console.log(err);
    console.log("saved to database");
    res.redirect("/");
  });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(
    `Servidor de automatizacion de sorteo iniciado en http://localhost:${PORT}`
  );
});
