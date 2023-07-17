const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const config = require('../config');
const Progreso = require('../models/progresoModel');

router.post('/getPanelActual', async function (req, res){
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
        const token = authHeader.split(" ")[1];
        try {
            const decodedToken = jwt.verify(token, config.secretKey);
            const userId = decodedToken.id;
            const { leccionId } = req.body;
            const panels = await Progreso.findOne({leccionId: leccionId, userId: userId });
            res.status(200).json(panels);
        } catch (e) {
            res.status(500).json({ mensaje: 'Error al obtener los paneles actual' });
        }
    }
});


module.exports = router;
