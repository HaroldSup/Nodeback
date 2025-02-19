// routes/ConocimientosRoutes.js
const express = require('express');
const router = express.Router();
const {
  getConocimientos,
  getConocimientoById,
  createConocimiento,
  updateConocimiento,
  deleteConocimiento
} = require('../controllers/ConocimientosController');

// Obtener todos los registros
router.get('/', getConocimientos);

// Obtener un registro específico por ID
router.get('/:id', getConocimientoById);

// Crear un nuevo registro
router.post('/', createConocimiento);

// Actualizar un registro existente
router.put('/:id', updateConocimiento);

// Eliminar un registro
router.delete('/:id', deleteConocimiento);

module.exports = router;
