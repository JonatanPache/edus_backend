const mongoose = require('mongoose');

const panelSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true,
    },
    contenido: {
        type: String,
        required: true,
    },
    img: {
        type: [String],
        default: [],
    },
    leccionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Leccion',
        required: true,
    },
    orden: {
        type: Number,
        required: true,
    },
});

const Panel = mongoose.model('Panel', panelSchema);

module.exports = Panel;
