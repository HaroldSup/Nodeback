// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { login } = require('../controllers/authController');

// Endpoint de autenticación
router.post('/login', login);

module.exports = router;
