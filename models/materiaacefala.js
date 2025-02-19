const mongoose = require('mongoose');

const MateriaAcefalaSchema = new mongoose.Schema({
    asignatura: { 
        type: String, 
        required: [true, 'El campo "asignatura" es obligatorio'], 
        trim: true 
    },
    requisitos: { 
        type: String, 
        required: [true, 'El campo "requisitos" es obligatorio'], 
        trim: true 
    },
    semestre: { 
        type: String, 
        required: [true, 'El campo "semestre" es obligatorio'], 
        enum: [
            'SEMESTRE 1', 'SEMESTRE 2', 'SEMESTRE 3', 'SEMESTRE 4', 
            'SEMESTRE 5', 'SEMESTRE 6', 'SEMESTRE 7', 'SEMESTRE 8', 
            'SEMESTRE 9', 'SEMESTRE 10'
        ]
    },
    nivelAcademico: { 
        type: String, 
        required: [true, 'El campo "nivelAcadémico" es obligatorio'], 
        enum: ['Grado', 'Postgrado'] 
    },
    carrera: { 
        type: String, 
        required: [true, 'El campo "carrera" es obligatorio'], 
        trim: true 
    },
    gestion: { 
        type: String, 
        required: [true, 'El campo "gestión" es obligatorio'], 
        default: 'I-2024',
        trim: true 
    },
    horasTeoria: { 
        type: Number, 
        default: 0, 
        min: [0, 'Las horas de teoría no pueden ser negativas'] 
    },
    horasPracticas: { 
        type: Number, 
        default: 0, 
        min: [0, 'Las horas prácticas no pueden ser negativas'] 
    },
    horasLaboratorio: { 
        type: Number, 
        default: 0, 
        min: [0, 'Las horas de laboratorio no pueden ser negativas'] 
    },
    motivosAcefalia: { 
        type: String, 
        trim: true 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
}, { 
    timestamps: true // Agrega automáticamente createdAt y updatedAt
});

module.exports = mongoose.model('MateriaAcefala', MateriaAcefalaSchema);
