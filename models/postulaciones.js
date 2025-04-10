const mongoose = require('mongoose');

const PostulacionSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  correo: { type: String, required: true },
  celular: { type: String, required: true },
  ci: { type: String, required: true },
  universidad: { type: String, required: true },
  profesion: { type: String, required: true },
  anioTitulacion: { type: String, required: true },
  carrera: { type: String, required: true },
  tipoDocente: { type: String, required: true },
  // Actualizamos para usar 'carrera' en cada asignatura
  asignaturasSeleccionadas: {
    type: [
      {
        asignatura: { type: String },
        carrera: { type: String }, // <-- Campo actualizado
        nivel: { type: String },
      },
    ],
    required: true,
  },
  documentos: {
    cartaDocenteAntiguoLicenciatura: { type: String, required: false },
    cartaDocenteAntiguoTecnologico: { type: String, required: false },
    cartaDocenteAntiguoMateriaMilitar: { type: String, required: false },
    cartaDocenteNuevoLicenciatura: { type: String, required: false },
    cartaDocenteNuevoTecnologico: { type: String, required: false },
    cartaDocenteNuevoMateriaMilitar: { type: String, required: false },
    hojaVida: { type: String, required: false },
    tituloLicenciatura: { type: String, required: false },
    tituloTecnicoSuperior: { type: String, required: false },
    diplomadoEducacionSuperiorCompetencias: { type: String, required: false },
    cursosEspecialidad: { type: String, required: false },
    maestria: { type: String, required: false },
    doctorado: { type: String, required: false },
    posDoctorado: { type: String, required: false },
    cursos80a160: { type: String, required: false },
    cursoDiplomadoMayor160: { type: String, required: false },
    cursoIdiomaIngles: { type: String, required: false },
    libros: { type: String, required: false },
    textosAcademicos: { type: String, required: false },
    guiasFolletos: { type: String, required: false },
    articulosInvestigacion: { type: String, required: false },
    congresos: { type: String, required: false },
    simposiosSeminarios: { type: String, required: false },
    experienciaDocenteEMI: { type: String, required: false },
    experienciaDocenteOtrasInstituciones: { type: String, required: false },
    tutorTrabajoGrado: { type: String, required: false },
    miembroTribunalTrabajoGrado: { type: String, required: false },
    actividadProfesional: { type: String, required: false },
    participacionVidaUniversitaria: { type: String, required: false },
  },
  fechaRegistro: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Postulacion', PostulacionSchema);
