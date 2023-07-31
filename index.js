import express, { json } from 'express'
import pg from "pg"
import {config} from "dotenv"

const pool = new pg.Pool({connectionString: process.env.DATABASE_URL});

const app = express()

// Definir un puerto para nuestro servidor
const port = 3000 || process.env.PORT;

// Definir una ruta de prueba
app.get('/', (req, res) => {
  res.send('¡Hola Mundo!');
});

app.get('/ping', async (req, res) => {
    const result = await pool.query('SELECT NOW()')
    return res.json(result.rows[0])
  });

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});