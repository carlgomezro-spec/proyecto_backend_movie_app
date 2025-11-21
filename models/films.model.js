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
 
// const film1 = new Film({
//   Title: "Calígula",
//   Year: 1982,
//   Rated: "PG-18",
//   Released: "15 feb 19982",
//   Runtime: "136 min",
//   Genre: "Comedia",
//   Director: "Tinto Brass",
//   Actors: "Malcolm McDowell, Helen Mirren, Peter O'Toole",
//   Plot: "Película que cuenta con el sello de la revista erótica 'Penthouse', un drama sobre la vida de Calígula, el que fuera emperador de Roma",
//   Poster: "https://es.web.img2.acsta.net/c_310_420/medias/nmedia/18/83/26/26/20533346.jpg",
//   imdbID: "tt0080491",
//   Ratings: [],
//   Opinions: [] // vacío inicialmente
// });
// film1.save()
// .then((data) => console.log(data))
// .catch(error => console.log(error))

module.exports = Film;