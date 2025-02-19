// controllers/authController.js
const User = require('../models/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  try {
    const { nombreUsuario, password } = req.body;

    // Buscar el usuario por nombre de usuario
    const user = await User.findOne({ nombreUsuario });
    if (!user) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    // Comparar contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    // Si el usuario no está activo
    if (!user.activo) {
      return res.status(403).json({ message: 'Usuario inactivo' });
    }

    // Crear el token (asegúrate de tener definida la variable JWT_SECRET en tu .env)
    const token = jwt.sign(
      {
        id: user._id,
        nombre: user.nombre,
        nombreUsuario: user.nombreUsuario,
        email: user.email,
        permisos: user.permisos,
        administrador: user.administrador,
      },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.status(200).json({
      token,
      user: {
        id: user._id,
        nombre: user.nombre,
        nombreUsuario: user.nombreUsuario,
        email: user.email,
        permisos: user.permisos,
        administrador: user.administrador,
      },
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};
