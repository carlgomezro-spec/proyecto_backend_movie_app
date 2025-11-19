const Film = require('../models/films.model');

// Obtener todas las películas
const getAllMovies = async () => {
    return await Film.find();
};

// Contar todas las películas (para dashboard)
const countMovies = async () => {
    return await Film.countDocuments();
};

module.exports = {
    getAllMovies,
    countMovies
};
