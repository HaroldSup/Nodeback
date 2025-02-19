require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const conectarDB = require('./config/db');

const app = express();

// Validar variables de entorno críticas
if (!process.env.FRONTEND_URL || !process.env.FRONTEND_URL_localhost || !process.env.MONGO_URI) {
  console.error('❌ Faltan variables de entorno críticas. Verifica el archivo .env');
  process.exit(1);
}

// Conectar a la base de datos
conectarDB();

// Configuración de CORS
const allowedOrigins = [
  process.env.FRONTEND_URL_localhost,
  process.env.FRONTEND_URL,
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.error(`⚠️ CORS rechazado para el origen: ${origin}`);
      callback(new Error('No permitido por CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// Servir archivos estáticos desde la carpeta "uploads"
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Middleware para servir el archivo robots.txt
app.get('/robots.txt', (req, res) => {
  res.type('text/plain');
  res.sendFile(path.join(__dirname, 'public/robots.txt')); 
});

// ──────────────────────────────────────────────
// 🔹 **Conexión a MongoDB Atlas**
// ──────────────────────────────────────────────
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('✅ Conectado a MongoDB Atlas'))
  .catch(err => {
    console.error('❌ Error conectando a MongoDB Atlas', err);
    process.exit(1); // Cerrar la aplicación si no se puede conectar
  });

// 🔹 **(Conexión Local - Comentada)**
// mongoose.connect('mongodb://localhost:27017/seleccion_docente_db', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
//   .then(() => console.log('✅ Conectado a MongoDB Local'))
//   .catch(err => console.error('❌ Error conectando a MongoDB Local', err));

// ──────────────────────────────────────────────
// 🔹 **Rutas de la API**
// ──────────────────────────────────────────────
app.use('/materias', require('./routes/MateriaRoutes'));
console.log('Ruta /materias cargada');

app.use('/usuarios', require('./routes/userRoutes'));
console.log('Ruta /usuarios cargada');

app.use('/postulaciones', require('./routes/postulaciones'));
console.log('Ruta /postulaciones cargada');

app.use('/api/concurso-meritos', require('./routes/meritoRoutes'));
console.log('Ruta /api/concurso-meritos cargada');

app.use('/api/examen-competencias', require('./routes/CompetenciasRoutes'));
console.log('Ruta /api/examen-competencias cargada');

app.use('/api/examen-conocimientos', require('./routes/ConocimientosRoutes'));
console.log('Ruta /api/examen-conocimientos cargada');

app.use('/auth', require('./routes/authRoutes'));
console.log('Ruta /auth cargada');

app.use('/api/workflow', require('./routes/workflowroutes'));
console.log('Ruta /api/workflow cargada');

// ──────────────────────────────────────────────
// 🔹 **NUEVAS RUTAS PARA GESTIÓN DE DOCUMENTOS Y FIRMA DIGITAL**
// ──────────────────────────────────────────────
const multer = require('multer');
const fs = require('fs');
const { exec } = require('child_process');

const REQUISITOS_DIR = process.env.REQUISITOS_DIR || 'C:\\Decimoooo\\Trabajo de Grado II\\REQUISITOS';
const FIRMA_DIR = process.env.FIRMA_DIR || 'C:\\Decimoooo\\Firma Digital';

if (!fs.existsSync(REQUISITOS_DIR)) {
  fs.mkdirSync(REQUISITOS_DIR, { recursive: true });
}
if (!fs.existsSync(FIRMA_DIR)) {
  fs.mkdirSync(FIRMA_DIR, { recursive: true });
}

// Servir archivos firmados desde FIRMA_DIR
app.use('/firma', express.static(FIRMA_DIR));

const uploadFile = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, REQUISITOS_DIR);
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  }),
});

app.post('/api/upload-file', uploadFile.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No se subió el archivo.' });
  }
  return res.json({ message: 'Archivo subido correctamente.', filename: req.file.filename });
});

app.post('/api/open-jacobitus', (req, res) => {
  const jacobitusPath = 'C:\\Program Files\\Jacobitus Total\\Jacobitus Total.exe';
  const command = `powershell -Command "Start-Process '${jacobitusPath}' -Verb runAs"`;
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error('Error al abrir Jacobitus como administrador:', error);
      return res.status(500).json({ error: 'No se pudo abrir Jacobitus como administrador.' });
    }
    console.log('Jacobitus abierto como administrador:', stdout);
    return res.json({ message: 'Jacobitus abierto correctamente (modo admin).' });
  });
});

app.get('/api/signed-documents', (req, res) => {
  fs.readdir(FIRMA_DIR, (err, files) => {
    if (err) {
      console.error('Error al leer el directorio de firma:', err);
      return res.status(500).json({ error: 'Error al leer los documentos firmados.' });
    }
    const pdfFiles = files.filter((file) => file.toLowerCase().endsWith('.pdf'));
    const documentos = pdfFiles.map((file) => ({
      name: file,
      url: `/firma/${encodeURIComponent(file)}`,
    }));
    return res.json(documentos);
  });
});

// ──────────────────────────────────────────────
// 🔹 **Middleware para manejo de errores**
// ──────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  if (err.message === 'Tipo de archivo no permitido') {
    return res.status(400).json({ message: err.message });
  }
  res.status(500).json({
    message: 'Ocurrió un error en el servidor',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

// ──────────────────────────────────────────────
// 🔹 **Iniciar el servidor**
// ──────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});
