// models/conocimientos.js
const mongoose = require('mongoose');

const ConocimientosSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  carnet: { type: String, required: true },
  fecha: { type: Date, required: true },
  examenConocimientos: { type: Number, required: true },
  // notaFinal se calcula como examenConocimientos * 0.4
  notaFinal: { type: Number, required: true },
  // Campo para el nombre del evaluador
  nombreEvaluador: { type: String, required: false },
  // Nuevos campos agregados:
  profesion: { type: String, default: '' },
  materia: { type: String, default: '' },
  carrera: { type: String, default: '' },
  habilitado: { type: String, default: '' },
  observaciones: { type: String, default: '' }
});

module.exports = mongoose.model('Conocimiento', ConocimientosSchema);
