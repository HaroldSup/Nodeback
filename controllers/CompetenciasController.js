const Competencia = require('../models/competencias');

// Obtener todas las competencias
exports.getCompetencias = async (req, res) => {
  try {
    const competencias = await Competencia.find();
    res.status(200).json(competencias);
  } catch (error) {
    console.error('Error al obtener las competencias:', error);
    res.status(500).json({ message: 'Error al obtener las competencias', error });
  }
};

// Crear una nueva competencia
exports.createCompetencia = async (req, res) => {
  try {
    const nuevaCompetencia = new Competencia(req.body);
    const resultado = await nuevaCompetencia.save();
    res.status(201).json(resultado);
  } catch (error) {
    console.error('Error al crear la competencia:', error);
    res.status(400).json({ message: 'Error al crear la competencia', error });
  }
};

// Actualizar una competencia existente
exports.updateCompetencia = async (req, res) => {
  try {
    const { id } = req.params;
    const competenciaActualizada = await Competencia.findByIdAndUpdate(id, req.body, { new: true });
    if (!competenciaActualizada) {
      return res.status(404).json({ message: 'Competencia no encontrada' });
    }
    res.status(200).json(competenciaActualizada);
  } catch (error) {
    console.error('Error al actualizar la competencia:', error);
    res.status(400).json({ message: 'Error al actualizar la competencia', error });
  }
};

// Eliminar una competencia
exports.deleteCompetencia = async (req, res) => {
  try {
    const { id } = req.params;
    const competenciaEliminada = await Competencia.findByIdAndDelete(id);
    if (!competenciaEliminada) {
      return res.status(404).json({ message: 'Competencia no encontrada' });
    }
    res.status(200).json({ message: 'Competencia eliminada exitosamente' });
  } catch (error) {
    console.error('Error al eliminar la competencia:', error);
    res.status(500).json({ message: 'Error al eliminar la competencia', error });
  }
};
