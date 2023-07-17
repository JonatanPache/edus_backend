const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const config = require('../config');
const Curso = require('../models/cursoModel');

router.get('/getCursos', async function (req, res){
    try {
        const cursos = await Curso.find({});
        res.status(200).json(cursos);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener los cursos' });
    }
});

router.post('/getLecciones', async function (req, res){
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
        const token = authHeader.split(" ")[1];
        try {
            const decodedToken = jwt.verify(token, config.secretKey);
            const userId = decodedToken.id;
            const user = await User.findOne({ _id:userId });
            res.json(user.username);
        } catch (e) {
            console.log(e)
        }
    }
});


router.post('/getLeccion', async function (req, res){
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
        const token = authHeader.split(" ")[1];
        try {
            const decodedToken = jwt.verify(token, config.secretKey);
            const userId = decodedToken.id;
            const user = await User.findOne({ _id:userId });
            res.json(user.username);
        } catch (e) {
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
