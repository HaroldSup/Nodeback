const express = require('express');
const router = express.Router();
const MateriaAcefala = require('../models/materiaacefala'); 

router.post('/register', async (req, res) => {
    try {
        const { asignatura, requisitos, semestre, nivelAcademico, carrera } = req.body;

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
        res.status(500).json({ message: 'Error al registrar la materia', error });
    }
});

router.get('/', async (req, res) => {
    try {
        const materias = await MateriaAcefala.find();
        res.status(200).json(materias);
    } catch (error) {
        console.error('Error al obtener las materias:', error);
        res.status(500).json({ message: 'Error al obtener las materias', error });
    }
});

module.exports = router;
