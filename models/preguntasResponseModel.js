const mongoose = require('mongoose');

const preguntaSchema = new mongoose.Schema({
    preguntaId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pregunta',
        required: true,
    },
    usuarioId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    duration: {
        type: Number,
        default: 1,
    },
    respuestaCorrecta: {
        type: Boolean,
        default: false,
    },
});

const PreguntaResponse = mongoose.model('preguntaResponse', preguntaSchema);

module.exports = PreguntaResponse;
