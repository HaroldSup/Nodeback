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

    // Validar campos requeridos
    if (!asignatura || !semestre || !nivelAcademico || !carrera || !gestion) {
      return res.status(400).json({
        message: 'Faltan campos obligatorios para registrar la materia.',
      });
    }

    // Crear una nueva materia
    const materia = new Materia({
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
    });

    // Guardar en la base de datos
    const savedMateria = await materia.save();

    // Devolver una respuesta clara
    res.status(201).json({
      message: 'Materia registrada exitosamente',
      materia: savedMateria,
    });
  } catch (error) {
    console.error('Error al registrar materia:', error);

    // Enviar un mensaje de error claro al frontend
    res.status(500).json({
      message: 'Error al registrar la materia. Inténtalo nuevamente.',
      error: error.message,
    });
  }
};

// Obtener todas las materias
exports.getMaterias = async (req, res) => {
  try {
    const materias = await Materia.find();

    if (!materias || materias.length === 0) {
      return res.status(404).json({
        message: 'No se encontraron materias.',
      });
    }

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
    if (!asignatura || !semestre || !nivelAcademico || !carrera || !gestion) {
      return res.status(400).json({
        message: 'Faltan campos obligatorios para actualizar la materia.',
      });
    }

    // Actualizar materia por ID
    const updatedMateria = await Materia.findByIdAndUpdate(
      id,
      {
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
      },
      { new: true, runValidators: true } // `runValidators` asegura que se respeten las validaciones del modelo
    );

    if (!updatedMateria) {
      return res.status(404).json({
        message: 'Materia no encontrada.',
      });
    }

    res.status(200).json({
      message: 'Materia actualizada exitosamente',
      updatedMateria,
    });
  } catch (error) {
    console.error('Error al actualizar materia:', error);

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
