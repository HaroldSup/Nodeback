// models/workflowmodels.js
const mongoose = require('mongoose');

const workflowSchema = new mongoose.Schema({
  id: { type: String, required: true }, // ID único del nodo
  nombre: { type: String, required: true }, // Nombre del nodo
  descripcion: { type: String }, // Descripción del nodo
  datos: { type: Array }, // Información adicional (e.g., lista de acefalías)
});

module.exports = mongoose.model('Workflow', workflowSchema);
