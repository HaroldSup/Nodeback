const express = require('express');
const {
  getCompetencias,
  createCompetencia,
  updateCompetencia,
  deleteCompetencia,
} = require('../controllers/CompetenciasController');

const router = express.Router();

// Definir rutas
router.get('/', getCompetencias);
router.post('/', createCompetencia);
router.put('/:id', updateCompetencia);
router.delete('/:id', deleteCompetencia);

module.exports = router;
