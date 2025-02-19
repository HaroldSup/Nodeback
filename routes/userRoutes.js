const express = require('express');
const router = express.Router();
const { createUser, getUsers, updateUser, deleteUser } = require('../controllers/userController');

// Ruta para registrar un usuario
router.post('/register', createUser);

// Ruta para obtener todos los usuarios
router.get('/', getUsers);

// Ruta para actualizar un usuario por ID
router.put('/:id', updateUser);

// Ruta para eliminar un usuario por ID
router.delete('/:id', deleteUser);

module.exports = router;
