const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  nombreUsuario: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  activo: { type: Boolean, default: true },
  administrador: { type: Boolean, default: false },
  carreras: [{ type: String }],
  permisos: { type: Map, of: Boolean }, 
}, {
  timestamps: true,
});

module.exports = mongoose.model('User', userSchema);
