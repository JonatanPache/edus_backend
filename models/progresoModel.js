const mongoose = require('mongoose');

const progresoSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    leccionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Leccion',
        required: true,
    },
    completado: {
        type: Boolean,
        default: false,
    },
    panelActual: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Panel',
        default: null,
    },
    panelesCompletados: {
        type: Number,
        default: 0,
    },
    totalPaneles: {
        type: Number,
        required: true,
    },
});

const   Progreso = mongoose.model('Progreso', progresoSchema);

module.exports = Progreso;
