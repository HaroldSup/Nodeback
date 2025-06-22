const Materia = require('../models/materiaacefala');

// Crear materia
exports.createMateria = async (req, res) => {
  try {
    const {
      asignatura,
      requisitos,
      semestre,
      nivelAcademico,
      carrera,
      gestion,
      horasTeoria,
      horasPracticas,
      horasLaboratorio,
      motivosAcefalia,
    } = req.body;

    console.log('Datos recibidos:', req.body); // Para debug

    // Validar campos requeridos
    if (!asignatura || !requisitos || !semestre || !nivelAcademico || !carrera || !gestion || !motivosAcefalia) {
      return res.status(400).json({
        message: 'Faltan campos obligatorios para registrar la materia.',
        required: ['asignatura', 'requisitos', 'semestre', 'nivelAcademico', 'carrera', 'gestion', 'motivosAcefalia'],
        received: req.body
      });
    }

    // Verificar si ya existe una materia con los mismos datos
    const existingMateria = await Materia.findOne({
      asignatura: asignatura.trim(),
      carrera: carrera.trim(),
      semestre: semestre.trim()
    });

    if (existingMateria) {
      return res.status(409).json({
        message: 'Ya existe una materia con la misma asignatura, carrera y semestre.',
        exists: true
      });
    }

    // Crear una nueva materia
    const materia = new Materia({
      asignatura: asignatura.trim(),
      requisitos: requisitos.trim(),
      semestre: semestre.trim(),
      nivelAcademico: nivelAcademico.trim(),
      carrera: carrera.trim(),
      gestion: gestion.trim(),
      horasTeoria: parseInt(horasTeoria) || 0,
      horasPracticas: parseInt(horasPracticas) || 0,
      horasLaboratorio: parseInt(horasLaboratorio) || 0,
      motivosAcefalia: motivosAcefalia.trim(),
    });

    // Guardar en la base de datos
    const savedMateria = await materia.save();

    console.log('Materia guardada:', savedMateria); // Para debug

    // Devolver una respuesta clara
    res.status(201).json({
      message: 'Materia registrada exitosamente',
      materia: savedMateria,
    });
  } catch (error) {
    console.error('Error al registrar materia:', error);

    // Manejar errores de validación de Mongoose
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        message: 'Error de validación',
        errors: errors,
        details: error.errors
      });
    }

    // Enviar un mensaje de error claro al frontend
    res.status(500).json({
      message: 'Error al registrar la materia. Inténtalo nuevamente.',
      error: error.message,
    });
  }
};

// Verificar si una materia existe (para el frontend)
exports.verificarMateria = async (req, res) => {
  try {
    const { asignatura, carrera, semestre } = req.body;

    if (!asignatura || !carrera || !semestre) {
      return res.status(400).json({
        message: 'Faltan datos para verificar la materia',
        required: ['asignatura', 'carrera', 'semestre']
      });
    }

    const existingMateria = await Materia.findOne({
      asignatura: asignatura.trim(),
      carrera: carrera.trim(),
      semestre: semestre.trim()
    });

    res.status(200).json({
      exists: !!existingMateria,
      materia: existingMateria || null
    });
  } catch (error) {
    console.error('Error al verificar materia:', error);
    res.status(500).json({
      message: 'Error al verificar la materia',
      error: error.message,
    });
  }
};

// Obtener todas las materias
exports.getMaterias = async (req, res) => {
  try {
    const materias = await Materia.find().sort({ createdAt: -1 });

    res.status(200).json(materias);
  } catch (error) {
    console.error('Error al obtener materias:', error);

    res.status(500).json({
      message: 'Error al obtener las materias. Inténtalo nuevamente.',
      error: error.message,
    });
  }
};

// Editar materia
exports.updateMateria = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      asignatura,
      requisitos,
      semestre,
      nivelAcademico,
      carrera,
      gestion,
      horasTeoria,
      horasPracticas,
      horasLaboratorio,
      motivosAcefalia,
    } = req.body;

    // Validar campos requeridos
    if (!asignatura || !requisitos || !semestre || !nivelAcademico || !carrera || !gestion || !motivosAcefalia) {
      return res.status(400).json({
        message: 'Faltan campos obligatorios para actualizar la materia.',
      });
    }

    // Actualizar materia por ID
    const updatedMateria = await Materia.findByIdAndUpdate(
      id,
      {
        asignatura: asignatura.trim(),
        requisitos: requisitos.trim(),
        semestre: semestre.trim(),
        nivelAcademico: nivelAcademico.trim(),
        carrera: carrera.trim(),
        gestion: gestion.trim(),
        horasTeoria: parseInt(horasTeoria) || 0,
        horasPracticas: parseInt(horasPracticas) || 0,
        horasLaboratorio: parseInt(horasLaboratorio) || 0,
        motivosAcefalia: motivosAcefalia.trim(),
      },
      { new: true, runValidators: true }
    );

    if (!updatedMateria) {
      return res.status(404).json({
        message: 'Materia no encontrada.',
      });
    }

    res.status(200).json({
      message: 'Materia actualizada exitosamente',
      materia: updatedMateria,
    });
  } catch (error) {
    console.error('Error al actualizar materia:', error);

    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        message: 'Error de validación',
        errors: errors
      });
    }

    res.status(500).json({
      message: 'Error al actualizar la materia. Inténtalo nuevamente.',
      error: error.message,
    });
  }
};

// Eliminar materia
exports.deleteMateria = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedMateria = await Materia.findByIdAndDelete(id);

    if (!deletedMateria) {
      return res.status(404).json({
        message: 'Materia no encontrada.',
      });
    }

    res.status(200).json({
      message: 'Materia eliminada exitosamente',
    });
  } catch (error) {
    console.error('Error al eliminar materia:', error);

    res.status(500).json({
      message: 'Error al eliminar la materia. Inténtalo nuevamente.',
      error: error.message,
    });
  }
};