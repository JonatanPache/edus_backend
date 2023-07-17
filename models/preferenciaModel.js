const mongoose = require('mongoose');

const preferenciaSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    etiquetas: {
        type: [String],
        required: true,
    },
});

const Preferencia = mongoose.model('Preferencia', preferenciaSchema);

module.exports = Preferencia;
