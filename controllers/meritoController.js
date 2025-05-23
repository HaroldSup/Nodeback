const Merito = require('../models/merito');

exports.getMeritos = async (req, res) => {
  try {
    const meritos = await Merito.find();
    res.status(200).json(meritos);
  } catch (error) {
    console.error('Error al obtener los méritos:', error);
    res.status(500).json({ message: 'Error al obtener los méritos', error });
  }
};

exports.createMerito = async (req, res) => {
  console.log('Headers:', req.headers);
  console.log('Body recibido:', req.body);

  if (Object.keys(req.body).length === 0) {
    return res
      .status(400)
      .json({ message: 'El cuerpo de la solicitud está vacío' });
  }

  try {
    // Ahora ya NO eliminamos el campo "carrera" (y tampoco otros campos nuevos)
    const nuevoMerito = new Merito(req.body);
    const resultado = await nuevoMerito.save();
    res.status(201).json(resultado);
  } catch (error) {
    console.error('Error al crear el mérito:', error);
    res.status(500).json({ message: 'Error al crear el mérito', error });
  }
};

exports.updateMerito = async (req, res) => {
  const { id } = req.params;

  try {
    // No se elimina ningún campo, se actualiza con los datos enviados
    const meritoActualizado = await Merito.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!meritoActualizado) {
      return res.status(404).json({ message: 'Registro no encontrado' });
    }
    res.status(200).json(meritoActualizado);
  } catch (error) {
    console.error('Error al actualizar el mérito:', error);
    res.status(500).json({ message: 'Error al actualizar el mérito', error });
  }
};

exports.deleteMerito = async (req, res) => {
  const { id } = req.params;

  try {
    const meritoEliminado = await Merito.findByIdAndDelete(id);
    if (!meritoEliminado) {
      return res.status(404).json({ message: 'Registro no encontrado' });
    }
    res.status(200).json({ message: 'Mérito eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar el mérito:', error);
    res.status(500).json({ message: 'Error al eliminar el mérito', error });
  }
};
