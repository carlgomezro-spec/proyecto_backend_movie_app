const pool = require('../config/db_sql');
const queries = require('../queries/users.queries');

// GET /api/user -> Obtener usuario por id
const getUserById = async (id) => {
    try {
        const client = await pool.connect();
        const data = await client.query(queries.getUserById, [id]);
        client.release();

        const user = data.rows[0];

        if (!user) return null;

        // Nunca enviar password
        delete user.password;

        return user;

    } catch (err) {
        console.error('Error en getUserById:', err);
        throw err;
    }
};


// PUT /api/user -> Actualizar usuario
const updateUserById = async (id, userData) => {
    try {
        const client = await pool.connect();

        // Solo permitir campos válidos
        const allowedFields = ["name", "email", "avatar"];
        const fields = [];
        const values = [];
        let index = 1;

        for (const key of allowedFields) {
            if (userData[key] !== undefined) {
                fields.push(`${key} = $${index}`);
                values.push(userData[key]);
                index++;
            }
        }

        // Si no hay nada que actualizar
        if (fields.length === 0) {
            client.release();
            return 0;
        }

        values.push(id);

        const query = `
            UPDATE users 
            SET ${fields.join(", ")}
            WHERE id = $${index}
        `;

        const result = await client.query(query, values);
        client.release();

        return result.rowCount;

    } catch (err) {
        console.error('Error en updateUserById:', err);
        throw err;
    }
};


// DELETE /api/user/:id
const deleteUserById = async (id) => {
    try {
        const client = await pool.connect();
        const result = await client.query(queries.deleteUserById, [id]);
        client.release();

        return result.rowCount; // 0 si no existía

    } catch (err) {
        console.error('Error en deleteUserById:', err);
        throw err;
    }
};


// GET /users -> Obtener todos los usuarios
const getAllUsers = async () => {
    try {
        const client = await pool.connect();
        const data = await client.query(queries.getAllUsers);
        client.release();

        // Elimina contraseñas de cada usuario
        const users = data.rows.map(user => {
            delete user.password;
            return user;
        });

        return users;

    } catch (err) {
        console.error('Error en getAllUsers:', err);
        throw err;
    }
};


module.exports = {
    getUserById,
    updateUserById,
    deleteUserById,
    getAllUsers
};
