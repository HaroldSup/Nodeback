const mongoose = require('mongoose');

const competenciasSchema = new mongoose.Schema(
  {
    tipoEvaluador: { type: String, required: true },
    nombre: { type: String, required: true },
    carnet: { type: String, required: true },
    materia: { type: String, required: true },
    carrera: { type: String, required: true }, 
    fecha: { type: Date, required: true },
    planConcordancia: { type: Number, required: true },
    planCompetencia: { type: Number, required: true },
    planContenidos: { type: Number, required: true },
    planEstrategiasEnsenanza: { type: Number, required: true },
    planEstrategiasEvaluacion: { type: Number, required: true },
    procesoMotivacion: { type: Number, required: true },
    procesoDominio: { type: Number, required: true },
    procesoTICs: { type: Number, required: true },
    procesoExplicacion: { type: Number, required: true },
    notaPlanTrabajo: { type: Number, required: true }, 
    notaProcesosPedagogicos: { type: Number, required: true }, 
    nombreEvaluador: { type: String, required: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Competencia', competenciasSchema);
