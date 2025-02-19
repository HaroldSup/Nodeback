// controllers/workflowcontrollers.js
const Workflow = require('../models/workflowmodels');
const WorkflowSequence = require('../models/workflowSequence');

// Obtener información de un nodo por su ID
exports.getNodeById = async (req, res) => {
  try {
    const { id } = req.params;
    const node = await Workflow.findOne({ id });

    if (!node) {
      return res.status(404).json({ message: 'Nodo no encontrado' });
    }

    res.status(200).json(node);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

// Registrar la secuencia de módulos visitados
exports.registerSequence = async (req, res) => {
  try {
    const { modules } = req.body;
    if (!modules || !Array.isArray(modules)) {
      return res.status(400).json({ message: 'Modules deben ser un arreglo.' });
    }
    const newSequence = await WorkflowSequence.create({ modules });
    res.status(201).json(newSequence);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error del servidor al registrar la secuencia' });
  }
};
