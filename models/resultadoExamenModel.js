const mongoose = require('mongoose');

const resultadoExamenSchema = new mongoose.Schema({
    examenId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Examen',
        required: true,
    },
    usuarioId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    puntaje: {
        type: Number,
        required: true,
    },
    nivelDominio: {
        type: String,
        required: true,
    },
    fortalezas: {
        type: [String],
        default: [],
    },
    debilidades: {
        type: [String],
        default: [],
    },
    correctos:{
        type: Number,
    }
});

const ResultadoAnalisis = mongoose.model('resultadoExamenAnalisis', resultadoExamenSchema);

module.exports = ResultadoAnalisis;
