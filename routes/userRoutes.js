const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const config = require('../config')


const User = require("../models/userModel");
const Preferencia = require("../models/preferenciaModel");

// Registrar un nuevo usuario
router.post("/registro", (req, res) => {
  var userData = req.body;
  // Generar el hash del password
  bcrypt.hash(userData.password, saltRounds, function (err, hash) {
    if (err) {
      console.error("Error al generar el hash del password:", err);
      // Manejar el error de generación del hash
      return res.status(500).send("Error en el servidor");
    }

    // Actualizar el objeto userData con el hash del password
    userData.password = hash;

    // Resto de la lógica de registro...
    console.log("Datos recibidos:", userData);
    // Resto de la lógica de registro...

    // Crear una instancia del modelo de usuario
    const newUser = new User(userData);

    // Guardar el nuevo usuario en la base de datos
    newUser
      .save()
      .then(() => {
        console.log("Usuario registrado:", newUser);
        res.status(200).send("Registro exitoso");
      })
      .catch((err) => {
        console.error("Error al guardar el usuario:", err);
        res.status(500).send("Error en el servidor");
      });
  });
});

// Iniciar sesion de un usuario ya registrado
router.post("/login", async function (req, res) {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).send("Nombre de usuario o contraseña incorrectos");
    }
    const token = jwt.sign({ id: user._id }, config.secretKey, {
      expiresIn: "10d",
    });
    user.token = token;
    return res.status(200).json({
      "success":true,
      "data":user,
      "message":"Inicio session correcto"
    });
  } catch (err) {
    console.error("Error al iniciar sesión:", err);
    return res.status(500).send("Error en el servidor");
  }
});

router.get('/getUser', async function (req, res){
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    try {
      const decodedToken = jwt.verify(token, config.secretKey);
      const userId = decodedToken.id;
      const user = await User.findOne({ _id:userId });
      res.json(user.username);
    } catch (e) {
      res.status(500).send("Token incorrecto");
      console.log(e)
    }
  }
});

router.post("/updateRole", (req, res)=>{
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    try {
      const decodedToken = jwt.verify(token, config.secretKey);
      const userId = decodedToken.id;
      const guestId = req.body.guestId;
      const newRole = req.body.newRole; // Nuevo rol que se desea asignar al usuario
      console.log(newRole);
      User.findOneAndUpdate({ _id: guestId }, { 'room.role': newRole }, { new: true })
          .then((user) => {
            // Actualización exitosa
            console.log('Rol actualizado correctamente',user.socketId);
            res.send({
              socketId:user.socketId,
              role: newRole
            });

          })
          .catch((error) => {
            // Error al actualizar
            console.error('Error al actualizar el rol:', error);
          });
    }catch (e) {
      console.log(e)
    }
  }
})

router.get('/getPreferencias', (req, res) => {
  Preferencia.find({}).exec()
      .then((preferencias) => {
        res.json(preferencias);
        console.log('Preferencias:', preferencias);
      })
      .catch((error) => {
        console.error('Error al obtener las preferencias:', error);
        res.status(500).json({ error: 'Error al obtener las preferencias' });
      });
});

module.exports = router;
