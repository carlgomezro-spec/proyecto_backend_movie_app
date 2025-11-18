const express = require('express');
const router = express.Router();

const movieAPI = require("../controllers/filmsController.js");
const movieWeb = require("../controllers/filmsWebController.js");
const Movie = require("../models/films.model");

//------------- WEB -------------

router.get("/search", async (req, res) => {
  const title = req.query.title;

  if (!title) {
    return res.render("search", { movies: null });
  }

  // supongamos que llamas al controller...
  const results = await buscarPeliculas(title);

  res.render("search", {
    query: title,
    movies: results.movies,
    noResults: results.movies.length === 0
  });
});

// Vista web del detalle
router.get("/search/:title", movieWeb.renderMovieDetail);

// -------------API--------------

// GET /api/movie/:title
router.get("/api/:title", movieAPI.getMovieByTitle);

// POST /api/movie
router.post("/api/movies", movieAPI.createMovie);

/*
{
  "id_film": 10,
  "title": "Película Prueba 1",
  "image": "https://img.freepik.com/fotos-premium/palomitas-maiz-voladoras-gafas-3d-carrete-pelicula-tablilla-sobre-fondo-amarillo-concepto-pelicula-cine-3d_989822-1302.jpg?semt=ais_hybrid&w=740&q=80",
  "year": 2025,
  "director": "Inventado 1",
  "gender": "Masculino",
  "duration": "120 min",
  "sinopsis": "Sinopsis de prueba",
  "actors": "Actor 1, Actor 2",
  "ratings": "das"
}
*/

// PUT /api/movie/:id
router.put("/api/movie:id", movieAPI.updateMovie);

// DELETE /api/movie/:id
router.delete("/:id", movieAPI.deleteMovie);

module.exports = router;
