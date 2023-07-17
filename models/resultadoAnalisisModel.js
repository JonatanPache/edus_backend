const mongoose = require('mongoose');

const resultadoAnalisisSchema = new mongoose.Schema({
    progreso: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Progreso',
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
});

const ResultadoAnalisis = mongoose.model('ResultadoAnalisis', resultadoAnalisisSchema);

module.exports = ResultadoAnalisis;
