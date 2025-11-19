// services/userService.js

const userModel = require('../models/userModels');

// Funciones del service, mismos nombres lógicos que en el controlador

const getUserById = async (id) => {
    return await userModel.getUserById(id);
};

const updateUserById = async (id, newData) => {
    return await userModel.updateUserById(id, newData);
};

const deleteUserById = async (id) => {
    return await userModel.deleteUserById(id);
};

const getAllUsers = async () => {
    return await userModel.getAllUsers();
};

module.exports = {
    getUserById,
    updateUserById,
    deleteUserById,
    getAllUsers
};
