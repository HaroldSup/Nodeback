// routes/workflowroutes.js
const express = require('express');
const router = express.Router();
const workflowController = require('../controllers/workflowcontrollers');

// Endpoint para obtener un nodo por su ID
router.get('/:id', workflowController.getNodeById);

// Endpoint para registrar la secuencia de módulos visitados
router.post('/registrar', workflowController.registerSequence);

module.exports = router;
