// services/favoritesService.js
const Film = require('../models/films.model');
const pool = require('../config/db_sql'); // asegúrate de descomentar y configurar

// Obtener IDs de películas favoritas de un usuario
const getFavoriteIdsByUser = async (userId) => {
    const result = await pool.query(
        'SELECT id_film FROM fav_films WHERE id_user = $1',
        [userId]
    );
    return result.rows.map(row => row.id_film);
};

// Obtener películas favoritas completas (MongoDB) a partir de los IDs
const getFavorites = async (userId) => {
    const favoriteIds = await getFavoriteIdsByUser(userId);
    return await Film.find({ id_film: { $in: favoriteIds } });
};

// Añadir película a favoritos
const addFavorite = async (userId, film_id) => {
    // Verificar existencia en MongoDB
    const filmExists = await Film.findOne({ id_film: film_id });
    if (!filmExists) throw new Error('Película no encontrada');

    // Verificar si ya es favorita
    const existingFavorite = await pool.query(
        'SELECT * FROM fav_films WHERE id_user = $1 AND id_film = $2',
        [userId, film_id]
    );
    if (existingFavorite.rows.length > 0) throw new Error('La película ya está en favoritos');

    // Insertar en DB
    await pool.query(
        'INSERT INTO fav_films (id_user, id_film) VALUES ($1, $2)',
        [userId, film_id]
    );

    return film_id;
};

// Eliminar película de favoritos
const removeFavorite = async (userId, film_id) => {
    const result = await pool.query(
        'DELETE FROM fav_films WHERE id_user = $1 AND id_film = $2',
        [userId, film_id]
    );
    if (result.rowCount === 0) throw new Error('Película no encontrada en favoritos');
    return film_id;
};

module.exports = {
    getFavorites,
    addFavorite,
    removeFavorite
};
