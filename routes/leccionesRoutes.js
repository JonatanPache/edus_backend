const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const config = require('../config');
const Leccion = require('../models/leccionModel');
const Progreso = require("../models/progresoModel");
const Examen = require("../models/examenModel");
const ResultadoExamen = require('../models/resultadoExamenModel');

const UserModel = require('../models/userModel');
const Pregunta = require('../models/preguntasModel');
const PreguntaResponse = require('../models/preguntasResponseModel')
const {introducirDatosEnModelo2} = require("../ai/bayesPrediction");

router.post('/getLecciones', async function (req, res){
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
        const token = authHeader.split(" ")[1];
        try {
            const decodedToken = jwt.verify(token, config.secretKey);
            const userId = decodedToken.id;
            const { cursoId } = req.body;
            await Leccion.find({cursoId: cursoId }).then(async (lessons)=>{
                var list = [];
                for (const lesson of lessons) {
                    const progreso = await Progreso.findOne({leccionId: lesson["_id"], userId: userId });

                    const lessonAct = {
                        "_id":lesson["_id"],
                        "titulo":lesson["titulo"],
                        "descripcion":lesson["descripcion"],
                        "duracion":lesson["duracion"],
                        "dificultad":lesson["dificultad"],
                        "orden":lesson["orden"],
                        "cursoId":lesson["cursoId"],
                        "img":lesson["img"],
                        "progreso":progreso
                    };
                    list.push(lessonAct);
                }
                res.status(200).json(list);
            })
        } catch (e) {

        }
    }
});

router.post('/getExamen', async function (req, res){
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
        const token = authHeader.split(" ")[1];
        try {
            const decodedToken = jwt.verify(token, config.secretKey);
            const userId = decodedToken.id;
            const { leccionId } = req.body;
            console.log(userId);
            await Examen.findOne({leccionId: leccionId }).then(async (examen)=>{
                var listPreg = [];
                for (const pregunta of examen.preguntas) {
                    console.log(pregunta);
                    const prg = await Pregunta.findOne({_id:pregunta});
                    listPreg.push(prg);
                }
                res.status(200).json({
                    "_id":examen._id,
                    "preguntas":listPreg,
                    "leccionId":examen.leccionId
                });
            })
        } catch (e) {

        }
    }
});

router.post('/setExamen', async function (req, res){
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
        const token = authHeader.split(" ")[1];
        try {
            const decodedToken = jwt.verify(token, config.secretKey);
            const userId = decodedToken.id;
            const { resultado } = req.body;
            const result = new ResultadoExamen({
                examenId: resultado.examenId,
                puntaje:resultado.puntaje,
                nivelDominio:resultado.nivelDominio,
                foratalezas:resultado.foratalezas,
                debilidades:resultado.debilidades,
                correctos:resultado.correctos,
                usuarioId:userId
            });
            result
                .save()
                .then(async () => {
                    console.log("Examen guardado:", result);
                    if(resultado.puntaje>50){
                        const examen = await Examen.findOne({_id: resultado.examenId});
                        await Progreso.updateOne({leccionId:examen.leccionId, userId:userId}, {$set: {completado:true}});
                    }
                    res.status(200).send("Registro exitoso");
                })
                .catch((err) => {
                    console.error("Error al guardar el usuario:", err);
                    res.status(500).send("Error en el servidor");
                });
        } catch (e) {
            console.error("Error al guardar el usuario:", e);
        }
    }
});

router.post('/saveResponse', async function (req, res){
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
        const token = authHeader.split(" ")[1];
        try {
            const decodedToken = jwt.verify(token, config.secretKey);
            const userId = decodedToken.id;
            const { preguntaId, duration, respuestaCorrecta } = req.body;
            console.log(userId);
            const result = new PreguntaResponse({
                preguntaId: preguntaId,
                duration: duration,
                respuestaCorrecta: respuestaCorrecta,
                usuarioId: userId
            });
            result
                .save()
                .then(() => {
                    console.log("Respuesta guardada:", result);
                    res.status(200).send("Saving exitoso");
                })
                .catch((err) => {
                    console.error("Error al guardar la respuesta:", err);
                    res.status(500).send("Error en el servidor");
                });
        } catch (e) {
            console.error("Error al guardar el usuario:", e);
        }
    }else{
        console.error("Error : token invalido");
    }
});

router.get('/updateLevelLearn', async function (req, res){
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
        const token = authHeader.split(" ")[1];
        try {
            const decodedToken = jwt.verify(token, config.secretKey);
            const userId = decodedToken.id;
            const list = [];
            await PreguntaResponse.find({usuarioId:userId}).then(async (items)=>{
                for (const item of items) {
                    await Pregunta.findOne({_id:item.preguntaId}).then( (pregunta)=>{
                        const dato = {"dificultad": pregunta.dificultad, "respuesta":item.respuestaCorrecta};
                        list.push(dato);
                    });
                }
            });
            await introducirDatosEnModelo2(list).then( async (value)=>{
                await UserModel.updateOne({_id:userId}, {$set: {nivelAprendizaje:value*100/3}});

                return res.status(200).json(value);
            });

        } catch (e) {
            console.error("Error al guardar el usuario:", e);
        }
    }else{
        console.error("Error : token invalido");
    }
});


module.exports = router;
