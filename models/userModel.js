const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  img: String,
  token: String,
  suscripcionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Suscripcion',
  },
  preferencias: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Preferencia',
  }],
  nivelAprendizaje: Number
  // otras propiedades del usuario
});

const User = mongoose.model('User', userSchema);

module.exports = User;