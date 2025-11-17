const queries = {
    createUsers:`
    INSERT INTO users (name, surname, email, password, role)
    VALUES ($1, $2, $3, $4, $5);`,

    getAllUsers:`SELECT *
    FROM users`,

    loginUsers: `
    SELECT name, surname, email, password, role
    FROM users
    WHERE name = $1 AND email = $2 AND password = $3;
    `,

    logoutUsers: `
    UPDATE users SET logged = false WHERE email = $1;
    `

};

    
module.exports = queries;