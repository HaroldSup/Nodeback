const Postulacion = require('../models/postulaciones');

exports.createPostulacion = async (req, res) => {
  try {
    const {
      nombre,
      correo,
      celular,
      ci,
      universidad,
      profesion,
      anioTitulacion,
      carrera,
      tipoDocente,
      asignaturasSeleccionadas,
    } = req.body;

    console.log('Body recibido:', req.body);
    console.log('Archivos recibidos:', req.files);

    // Validar datos obligatorios
    if (
      !nombre ||
      !correo ||
      !celular ||
      !ci ||
      !universidad ||
      !profesion ||
      !anioTitulacion ||
      !carrera ||
      !tipoDocente
    ) {
      return res
        .status(400)
        .json({ message: 'Todos los campos obligatorios deben ser completados' });
    }

    // Procesar asignaturasSeleccionadas (se espera un JSON string o arreglo)
    let asignaturas = [];
    try {
      asignaturas = Array.isArray(asignaturasSeleccionadas)
        ? asignaturasSeleccionadas
        : JSON.parse(asignaturasSeleccionadas || '[]');
    } catch (e) {
      return res
        .status(400)
        .json({ message: 'Asignaturas seleccionadas no tienen un formato válido.' });
    }

    // Procesar archivos subidos
    const documentKeys = [
      'cartaDocenteAntiguoLicenciatura',
      'cartaDocenteAntiguoTecnologico',
      'cartaDocenteAntiguoMateriaMilitar',
      'cartaDocenteNuevoLicenciatura',
      'cartaDocenteNuevoTecnologico',
      'cartaDocenteNuevoMateriaMilitar',
      'hojaVida',
      'tituloLicenciatura',
      'tituloTecnicoSuperior',
      'diplomadoEducacionSuperiorCompetencias',
      'cursosEspecialidad',
      'maestria',
      'doctorado',
      'posDoctorado',
      'cursos80a160',
      'cursoDiplomadoMayor160',
      'cursoIdiomaIngles',
      'libros',
      'textosAcademicos',
      'guiasFolletos',
      'articulosInvestigacion',
      'congresos',
      'simposiosSeminarios',
      'experienciaDocenteEMI',
      'experienciaDocenteOtrasInstituciones',
      'tutorTrabajoGrado',
      'miembroTribunalTrabajoGrado',
      'actividadProfesional',
      'participacionVidaUniversitaria',
    ];

    const documentos = {};
    documentKeys.forEach((key) => {
      if (req.files && req.files[key] && req.files[key][0]) {
        documentos[key] = req.files[key][0].path;
      } else {
        documentos[key] = null;
      }
    });

    const postulacion = new Postulacion({
      nombre,
      correo,
      celular,
      ci,
      universidad,
      profesion,
      anioTitulacion,
      carrera,
      tipoDocente,
      asignaturasSeleccionadas: asignaturas, // Cada objeto debe venir con propiedad "carrera"
      documentos,
    });

    await postulacion.save();
    res.status(201).json({ message: 'Postulación registrada con éxito', data: postulacion });
  } catch (error) {
    console.error('Error al registrar la postulación:', error);
    res.status(500).json({ message: 'Error al registrar la postulación', error });
  }
};

exports.getPostulaciones = async (req, res) => {
  try {
    const postulaciones = await Postulacion.find();
    res.status(200).json({ data: postulaciones });
  } catch (error) {
    console.error('Error al obtener las postulaciones:', error);
    res.status(500).json({ message: 'Error al obtener las postulaciones', error });
  }
};

exports.deletePostulacion = async (req, res) => {
  try {
    const { id } = req.params;
    const postulacion = await Postulacion.findByIdAndDelete(id);
    if (!postulacion) {
      return res.status(404).json({ message: 'Postulación no encontrada' });
    }
    res.status(200).json({ message: 'Postulación eliminada con éxito' });
  } catch (error) {
    console.error('Error al eliminar la postulación:', error);
    res.status(500).json({ message: 'Error al eliminar la postulación', error });
  }
};

exports.getPostulanteByCarnet = async (req, res) => {
  try {
    const { carnet } = req.params;
    const postulacion = await Postulacion.findOne({ ci: carnet });
    if (postulacion) {
      return res.status(200).json({ data: postulacion });
    }
    return res.status(404).json({ message: 'Postulante no encontrado' });
  } catch (error) {
    console.error('Error al buscar postulante por carnet:', error);
    return res.status(500).json({ message: 'Error al buscar postulante', error });
  }
};
