// middleware/auth.js
const jwt = require('jsonwebtoken');
require('dotenv').config(); // Asegura cargar las variables de entorno

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'No autorizado, falta token' });
  }

  // Se espera que el token se envíe en el formato "Bearer <token>"
  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Se espera que el token incluya, por ejemplo, { _id, administrador, ... }
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido' });
  }
};
