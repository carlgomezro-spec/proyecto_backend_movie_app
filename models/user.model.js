const queries = require("../queries/users.queries");

const createUser = async (name, surname, email, password, logged = false) => {
    return await executeQuery(queries.createUsers, [name, surname, email, password, logged]);
}

const loginUser = async (name, email, password) => {
    return await executeQuery(queries.loginUsers, [name, email, password]);
}

const logoutUser = async (email, password) => {
    return await executeQuery(queries.logoutUsers, [email])
}

module.exports = {
    createUser,
    loginUser,
    logoutUser
}