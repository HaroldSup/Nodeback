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
  carrera: { type: String, required: true },
  puntosEvaluacion: { type: Number, required: true },

  // NUEVO: Campo para almacenar el nombre del evaluador
  nombreEvaluador: { type: String, required: false },
});

module.exports = mongoose.model('Merito', meritoSchema);
