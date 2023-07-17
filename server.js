const express = require("express");
const app = express();
const http = require("http").Server(app);
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./models/userModel')
const jwt = require("jsonwebtoken");
const config = require("./config");
require('dotenv').config();

// routes
const userRoutes = require('./routes/userRoutes');
const cursosRoutes = require('./routes/cursoRoutes');
const leccionesRoutes = require('./routes/leccionesRoutes');
const panelesRoutes = require('./routes/panelRoutes');
const progresoRoutes = require('./routes/progresoRoutes');

// Iniciar el servidor
const port = 4000;
http.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});

// Configuración de conexión a MongoDB
mongoose.connect(`mongodb+srv://${process.env.nameDB}:${process.env.passDB}@cluster0.8inyyov.mongodb.net/?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.once('open', () => {
    console.log('Conexión a MongoDB establecida');
});

app.use(bodyParser.json());


app.use('/user', userRoutes);
app.use('/cursos', cursosRoutes);
app.use('/lessons', leccionesRoutes);
app.use('/panels', panelesRoutes);
app.use('/progreso', progresoRoutes);