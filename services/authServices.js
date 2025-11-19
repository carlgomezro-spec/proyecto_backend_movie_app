// services/authService.js
const authModel = require("../models/authModels");

const createUser = async (name, surname, email, password, role) => {
    return await authModel.createUser(name, surname, email, password, role);
};

const logIn = async (name, email, password) => {
    return await authModel.logInModel(name, email, password);
};

const logOut = async (email, password) => {
    return await authModel.logOutModel(email, password);
};

const recoverPassword = async (email) => {
    return await authModel.getUserModel(email);
};

module.exports = {
    createUser,
    logIn,
    logOut,
    recoverPassword
};
