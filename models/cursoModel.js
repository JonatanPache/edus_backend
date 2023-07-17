const mongoose = require('mongoose');

const cursoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    descripcionShort: {
        type: String,
        required: true,
    },
    descripcion: {
        type: String,
        required: true,
    },
    categoria: {
        type: String,
        required: true,
    },
    duracion: {
        type: Number,
        required: true,
    },
    experiencia: {
        type: Number,
        required: true,
    },
    img: [{
        type: String,
        required: true,
    }],
    imgLogo: {
        type: String,
        required: true,
    },
    lessonCount: {
        type: Number,
        default: 0,
    },
});

const Curso = mongoose.model('Curso', cursoSchema);

module.exports = Curso;
