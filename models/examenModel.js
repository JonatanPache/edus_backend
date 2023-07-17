const mongoose = require('mongoose');

const examenSchema = new mongoose.Schema({
    preguntas: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pregunta',
        required:true
    }],
    leccionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Leccion',
        required: true,
    },
});

const Examen = mongoose.model('Examen', examenSchema);

module.exports = Examen;
