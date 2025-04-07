const User = require('../models/Users');
const bcrypt = require('bcrypt');

// Crear usuario
exports.createUser = async (req, res) => {
  try {
    // Ahora se recibe el campo "carrera" (string) en lugar de "carreras"
    const { nombre, nombreUsuario, email, password, activo, administrador, carrera, permisos } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      nombre,
      nombreUsuario,
      email,
      password: hashedPassword,
      activo,
      administrador,
      carrera,  // Se asigna el campo carrera
      permisos,
    });

    await newUser.save();
    res.status(201).json({ message: 'Usuario creado exitosamente' });
  } catch (error) {
    console.log('Error completo:', error); // Para depuración
    res.status(500).json({ message: 'Error al crear el usuario', error });
  }
};

// Obtener usuarios
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los usuarios', error });
  }
};

// Editar usuario
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params; // ID del usuario a editar
    // Se desestructura "carrera" en lugar de "carreras"
    const { nombre, nombreUsuario, email, password, activo, administrador, carrera, permisos } = req.body;

    // Crear objeto de actualización
    const updateData = {
      nombre,
      nombreUsuario,
      email,
      activo,
      administrador,
      carrera,  // Se actualiza el campo carrera
      permisos,
    };

    // Si se proporciona una nueva contraseña, se hashea
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.status(200).json({ message: 'Usuario actualizado exitosamente', updatedUser });
  } catch (error) {
    console.log('Error completo:', error); // Para depuración
    res.status(500).json({ message: 'Error al actualizar el usuario', error });
  }
};

// Eliminar usuario
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.status(200).json({ message: 'Usuario eliminado exitosamente' });
  } catch (error) {
    console.log('Error completo:', error); // Para depuración
    res.status(500).json({ message: 'Error al eliminar el usuario', error });
  }
};
