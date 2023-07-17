const mongoose = require('mongoose');

const preguntaSchema = new mongoose.Schema({
    pregunta: {
        type: String,
        required: true,
    },
    LeccionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Leccion',
        required: true,
    },
    usuarioId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    fecha: {
        type: Date,
        default: Date.now,
    },
    nivelAprendizaje: {
        tipo: String,
        puntaje: Number,
    },
});

const Pregunta = mongoose.model('preguntaAnalysis', preguntaSchema);

module.exports = Pregunta;
