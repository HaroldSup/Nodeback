const express = require('express');
const router = express.Router();
const { createMateria, getMaterias, updateMateria, deleteMateria } = require('../controllers/MateriaController');

// Rutas CRUD
router.post('/register', createMateria); // Crear materia
router.get('/', getMaterias); // Obtener todas las materias
router.put('/:id', updateMateria); // Actualizar materia
router.delete('/:id', deleteMateria); // Eliminar materia

module.exports = router;
