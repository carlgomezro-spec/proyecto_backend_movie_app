const { body } = require("express-validator");

const validateCreateUser = [
    // Nombre de usuario
    body('username')
      .trim()
      .notEmpty().withMessage('El nombre de usuario es obligatorio')
      .isLength({ min: 3, max: 20 }).withMessage('El nombre de usuario debe tener entre 3 y 20 caracteres'),

    // Email
    body('email')
      .trim()
      .notEmpty().withMessage('El email es obligatorio')
      .isEmail().withMessage('El email no es válido')
      .normalizeEmail(),

    // Contraseña
    body('password')
      .notEmpty().withMessage('La contraseña es obligatoria')
      .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
      .matches(/\d/).withMessage('La contraseña debe incluir al menos un número')
      .matches(/[A-Z]/).withMessage('La contraseña debe incluir al menos una mayúscula'),

    // Confirmar contraseña
    body('confirmPassword')
      .notEmpty().withMessage('Debes confirmar la contraseña')
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Las contraseñas no coinciden');
        }
        return true;
      })
  ]

  module.exports = {
    validateCreateUser
  };