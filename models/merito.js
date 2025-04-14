const mongoose = require('mongoose');

const meritoSchema = new mongoose.Schema({
  nombrePostulante: { type: String, required: true },
  ci: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^\d{1,10}$/.test(v);
      },
      message: (props) =>
        `${props.value} no es un CI válido. Solo se permiten números y máximo 10 dígitos.`,
    },
  },
  fechaEvaluacion: { type: Date, required: true },
  puntosEvaluacion: { type: Number, required: true },
  nombreEvaluador: { type: String, required: false },
  // Nuevos campos añadidos:
  profesion: { type: String, default: '' },
  materia: { type: String, default: '' },
  carrera: { type: String, default: '' },
  habilitado: { type: String, default: '' },
  observaciones: { type: String, default: '' },
});

module.exports = mongoose.model('Merito', meritoSchema);
