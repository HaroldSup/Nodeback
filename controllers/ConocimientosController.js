// controllers/ConocimientosController.js
const Conocimiento = require('../models/conocimientos');

// Obtener todos los registros
const getConocimientos = async (req, res) => {
  try {
    const conocimientos = await Conocimiento.find();
    res.json(conocimientos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un registro por ID
const getConocimientoById = async (req, res) => {
  try {
    const conocimiento = await Conocimiento.findById(req.params.id);
    if (!conocimiento) {
      return res.status(404).json({ message: 'Registro no encontrado' });
    }
    res.json(conocimiento);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear un nuevo registro
const createConocimiento = async (req, res) => {
  try {
    // Extraer los campos del body, sin incluir "tipoEvaluador"
    const { 
      nombre, 
      carnet, 
      fecha, 
      examenConocimientos, 
      nombreEvaluador, 
      profesion, 
      materia, 
      carrera, 
      habilitado, 
      observaciones 
    } = req.body;
    // Calcular la nota final (40%)
    const notaFinal = parseFloat(examenConocimientos) * 0.4;
    const nuevoConocimiento = new Conocimiento({
      nombre,
      carnet,
      fecha,
      examenConocimientos,
      notaFinal,
      nombreEvaluador,
      profesion,
      materia,
      carrera,
      habilitado,
      observaciones
    });
    const registroGuardado = await nuevoConocimiento.save();
    res.status(201).json(registroGuardado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Actualizar un registro existente
const updateConocimiento = async (req, res) => {
  try {
    const { 
      nombre, 
      carnet, 
      fecha, 
      examenConocimientos, 
      nombreEvaluador, 
      profesion, 
      materia, 
      carrera, 
      habilitado, 
      observaciones 
    } = req.body;
    // Recalcular la nota final (40%)
    const notaFinal = parseFloat(examenConocimientos) * 0.4;
    const registroActualizado = await Conocimiento.findByIdAndUpdate(
      req.params.id,
      { 
        nombre, 
        carnet, 
        fecha, 
        examenConocimientos, 
        notaFinal, 
        nombreEvaluador, 
        profesion, 
        materia, 
        carrera, 
        habilitado, 
        observaciones 
      },
      { new: true }
    );
    if (!registroActualizado) {
      return res.status(404).json({ message: 'Registro no encontrado' });
    }
    res.json(registroActualizado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Eliminar un registro
const deleteConocimiento = async (req, res) => {
  try {
    const registroEliminado = await Conocimiento.findByIdAndDelete(req.params.id);
    if (!registroEliminado) {
      return res.status(404).json({ message: 'Registro no encontrado' });
    }
    res.json({ message: 'Registro eliminado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getConocimientos,
  getConocimientoById,
  createConocimiento,
  updateConocimiento,
  deleteConocimiento
};
