const express = require('express');
const router = express.Router();
const { 
  createPostulacion, 
  getPostulaciones, 
  deletePostulacion,
  getPostulanteByCarnet  // Se importa la nueva función
} = require('../controllers/postulacionesController');
const upload = require('../config/multer');

// Ruta para crear una postulación
router.post(
  '/',
  upload.fields([
    { name: 'cartaDocenteAntiguoLicenciatura', maxCount: 1 },
    { name: 'cartaDocenteAntiguoTecnologico', maxCount: 1 },
    { name: 'cartaDocenteAntiguoMateriaMilitar', maxCount: 1 },
    { name: 'cartaDocenteNuevoLicenciatura', maxCount: 1 },
    { name: 'cartaDocenteNuevoTecnologico', maxCount: 1 },
    { name: 'cartaDocenteNuevoMateriaMilitar', maxCount: 1 },
    { name: 'hojaVida', maxCount: 1 },
    { name: 'tituloLicenciatura', maxCount: 1 },
    { name: 'tituloTecnicoSuperior', maxCount: 1 },
    { name: 'diplomadoEducacionSuperiorCompetencias', maxCount: 1 },
    { name: 'cursosEspecialidad', maxCount: 1 },
    { name: 'maestria', maxCount: 1 },
    { name: 'doctorado', maxCount: 1 },
    { name: 'posDoctorado', maxCount: 1 },
    { name: 'cursos80a160', maxCount: 1 },
    { name: 'cursoDiplomadoMayor160', maxCount: 1 },
    { name: 'cursoIdiomaIngles', maxCount: 1 },
    { name: 'libros', maxCount: 1 },
    { name: 'textosAcademicos', maxCount: 1 },
    { name: 'guiasFolletos', maxCount: 1 },
    { name: 'articulosInvestigacion', maxCount: 1 },
    { name: 'congresos', maxCount: 1 },
    { name: 'simposiosSeminarios', maxCount: 1 },
    { name: 'experienciaDocenteEMI', maxCount: 1 },
    { name: 'experienciaDocenteOtrasInstituciones', maxCount: 1 },
    { name: 'tutorTrabajoGrado', maxCount: 1 },
    { name: 'miembroTribunalTrabajoGrado', maxCount: 1 },
    { name: 'actividadProfesional', maxCount: 1 },
    { name: 'participacionVidaUniversitaria', maxCount: 1 },
  ]),
  createPostulacion
);

// NUEVA RUTA: Obtener postulante por número de carnet
router.get('/carnet/:carnet', getPostulanteByCarnet);

// Ruta para obtener todas las postulaciones
router.get('/', getPostulaciones);

// Ruta para eliminar una postulación
router.delete('/:id', deletePostulacion);

module.exports = router;
