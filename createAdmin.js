// createAdmin.js
require('dotenv').config(); // Asegúrate de tener tus variables de entorno definidas en un .env
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/Users');
const conectarDB = require('./config/db');

// Función principal para crear el usuario admin
const createAdminUser = async () => {
  try {
    await conectarDB(); // Conecta a la base de datos

    // Verifica si ya existe un usuario admin
    const existingAdmin = await User.findOne({ nombreUsuario: 'admin' });
    if (existingAdmin) {
      console.log('El usuario administrador ya existe.');
      process.exit(0);
    }

    // Hashea la contraseña
    const hashedPassword = await bcrypt.hash('admin', 10);

    // Crea el usuario administrador con todos los permisos
    const adminUser = new User({
      nombre: 'Administrador',
      nombreUsuario: 'admin',
      email: 'admin@example.com',
      password: hashedPassword,
      activo: true,
      administrador: true,
      carreras: ['INGENIERÍA DE SISTEMAS', 'INGENIERÍA CIVIL'],
      permisos: {
        "Ver Acefalia": true,
        "Crear Acefalia": true,
        "Ver Usuario": true,
        "Crear Usuario": true,
        "Editar Usuario": true,
        "Eliminar Usuario": true,
        "Ver Postulaciones": true,
        "Ver Postulaciones por Carrera": true,
        "Firma Digital": true,
        "Workflow": true
      }
    });

    await adminUser.save();
    console.log('Usuario administrador creado exitosamente.');
    process.exit(0);
  } catch (error) {
    console.error('Error al crear el usuario administrador:', error);
    process.exit(1);
  }
};

createAdminUser();
