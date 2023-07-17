const mongoose = require('mongoose');

const tarjetaCreditoSchema = new mongoose.Schema({
    card_number: {
        type: Number,
        required: true,
        unique: true,
    },
    name_owner: {
        type: String,
        required: true,
    },
    dvv: {
        type: Number,
        required: true,
    },
    valid: {
        type: Boolean,
        default: false,
    },
    id_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true,
    },
    exp_month: {
        type: String,
        required: true,
    },
    exp_year: {
        type: String,
        required: true,
    },
    id_payment_method: {
        type: String,
        required: true,
    },
});

const TarjetaCredito = mongoose.model('TarjetaCredito', tarjetaCreditoSchema);

module.exports = TarjetaCredito;
