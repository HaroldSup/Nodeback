const express = require('express');
const router = express.Router();
const MateriaAcefala = require('../models/materiaacefala');


router.post('/register', async (req, res) => {
    try {
        const { asignatura, requisitos, semestre, nivelAcademico, carrera } = req.body;

        // Validar campos necesarios
        if (!asignatura || !requisitos || !semestre || !nivelAcademico || !carrera) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }

        const nuevaMateria = new MateriaAcefala({
            asignatura,
            requisitos,
            semestre,
            nivelAcademico,
            carrera,
        });
        
        await nuevaMateria.save();
        res.status(201).json({ message: 'Materia registrada exitosamente' });
    } catch (error) {
        console.error('Error al registrar la materia:', error);
        res.status(500).json({ message: 'Error al registrar la materia' });
    }
});

module.exports = router;
