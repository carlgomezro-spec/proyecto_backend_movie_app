const Film = require('../models/films.model');
const fetchFilm = require('../utils/fetchFilms');

// Buscar una película por título
const getMovieByTitle = async (title) => {
    // Buscar primero en OMDB
    const film = await fetchFilm.fetchOneFilm(title);
    if (film) return film;

    // Si no está en OMDB, buscar en MongoDB
    const localFilm = await Film.findOne({ Title: new RegExp(`^${title}$`, 'i') });
    if (localFilm) return localFilm;

    throw new Error('Film not found in OMDB or local database');
};

// Buscar todas las películas por título (similar a getMovieByTitle)
const getAllMovies = async (title) => {
    const films = await fetchFilm.fetchAllFilms(title);
    if (films) return films;

    const localFilm = await Film.findOne({ Title: new RegExp(`^${title}$`, 'i') });
    if (localFilm) return localFilm;

    throw new Error('Film not found in OMDB or local database');
};

// Crear película (solo admin)
const createMovie = async (filmData) => {
    // Aquí podrías guardar en MongoDB si lo quieres
    const filmTitle = filmData.Title || filmData.title;
    // Simulación de guardado
    return { message: `Se ha guardado ${filmTitle}` };
};

// Editar película (solo admin)
const updateMovie = async (filmData) => {
    const { id, Title, title } = filmData;
    const filmTitle = Title || title;
    return { id, message: `Se ha actualizado ${filmTitle}` };
};

// Eliminar película (solo admin)
const deleteMovie = async (title) => {
    return { title, message: `Se ha borrado la película con título: ${title}` };
};

module.exports = {
    getMovieByTitle,
    getAllMovies,
    createMovie,
    updateMovie,
    deleteMovie
};
