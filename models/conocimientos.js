// models/conocimientos.js
const mongoose = require('mongoose');

const ConocimientosSchema = new mongoose.Schema({
  tipoEvaluador: { type: String, required: true },
  nombre: { type: String, required: true },
  carnet: { type: String, required: true },
  fecha: { type: Date, required: true },
  examenConocimientos: { type: Number, required: true },
  // notaFinal se calcula como examenConocimientos * 0.4
  notaFinal: { type: Number, required: true },
  // Campo para el nombre del evaluador
  nombreEvaluador: { type: String, required: false }
});

module.exports = mongoose.model('Conocimiento', ConocimientosSchema);
