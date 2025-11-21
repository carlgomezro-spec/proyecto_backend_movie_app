const mongoose = require("mongoose");
require('../config/db_mongo') // Conexión a BDD MongoDB


// Crear Objeto
const objectSchema = {
    Title: {
        type: String,
        required: true
    },
    Year: {
        type: Number,
        required: true
    },
    Rated: {
        type: String,
        required: true
    },
    Released: {
        type: String,
        required: true
    },
    Runtime: {
        type: String,
        required: true
    },
    Genre: {
        type: String,
        required: true
    },
    Director: {
        type: String,
        required: true
    },
    Actors: {
        type: String,
        required: true
    },
    Plot: {
        type: String,
        required: true
    },
    Poster: {
        type: String,
        required: true
    },
    imdbID: {
        type: String,
        required: true
    },
    Ratings: [
        {
            Type: {
                type: String, 
                required: true
            },
            Source: {
                type: String, 
                required: false
            },
            Value: {
                type: String,
                required: true
            }
        }
    ],
    Opinions: [
        {
            type: String,
            message: String
        }
    ]
}

// Crear Esquema
const filmsSchema = mongoose.Schema(objectSchema);

// Crear Colección
const Film = mongoose.model("Films", filmsSchema);

// Documento de prueba
 
const film1 = new Film({
  Title: "Todos los lados de la cama",
  Year: 2025,
  Rated: "PG-13",
  Released: "05 May 2017",
  Runtime: "136 min",
  Genre: "Comedia",
  Director: "Samantha López",
  Actors: "Chris Pratt, Zoe Saldaña, Dave Bautista",
  Plot: "Tras décadas sin verse, Javier y Carlota montan en cólera cuando descubren que sus hijos Óscar y Julia planean casarse.",
  Poster: "https://es.web.img3.acsta.net/c_310_420/img/80/43/8043593f13b66a6dcfc29eb2108d2171.jpg",
  imdbID: "tt32760231",
  Ratings: [],
  Opinions: [] // vacío inicialmente
});
// film1.save()
// .then((data) => console.log(data))
// .catch(error => console.log(error))

module.exports = Film;