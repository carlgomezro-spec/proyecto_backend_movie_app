const express = require("express"); // Importando express
const cowsay = require("cowsay");

const connectDB = require("./config/db_mongo");
const cookieParser = require('cookie-parser');
// Leer fichero .env
require('dotenv').config();

const cookieParser = require('cookie-parser');


const connectDB = require("./config/db_mongo");

const app = express(); // Creando el servidor
const port = 3000; // Puerto de pruebas


// Habilitar recepción de JSON por mi backend
// Parsear el body entrante a JSON
app.use(express.json());
app.use(express.static('public')); // Para servir archivos estáticos del front CSS, JS, assets

// Middlewares
// const error404 = require("./middlewares/error404");
// Morgan
// const morgan = require("./middlewares/morgan");

// Configuración del logger con Morgan
// app.use(morgan(':method :url :status :param[id] - :response-time ms :body'));




// Iniciar el servidor
app.listen(port, () => {
  console.log(
    cowsay.say({
      text: `Endpoint Proyecto Movie App http://localhost:${port}`,
      f: "owl", 
    })
  );
});

connectDB(); // Conexión Mongo

module.exports = app; // Exportar la app para usarla en tests