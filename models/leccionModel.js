const mongoose = require('mongoose');

const leccionSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true,
    },
    descripcion: {
        type: String,
        required: true,
    },
    duracion: {
        type: Number,
        required: true,
    },
    dificultad: {
        type: String,
        required: true,
    },
    cursoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Curso',
        required: true,
    },
    orden: {
        type: Number,
        required: true,
        unique: true,
    },
    img: {
        type: String,
        required: true,
    },
});

const Leccion = mongoose.model('Leccion', leccionSchema);

module.exports = Leccion;
