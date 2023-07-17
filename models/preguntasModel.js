const mongoose = require('mongoose');

const preguntaSchema = new mongoose.Schema({
    pregunta: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    respuestas: {
        type: [String],
        required: true,
    },
    respuestaCorrecta: {
        type: Number,
        required: true,
    },
    dificultad:{
        type: String,
        required: true,
    }
});

const Pregunta = mongoose.model('pregunta', preguntaSchema);

module.exports = Pregunta;
