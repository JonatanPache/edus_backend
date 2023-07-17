const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const config = require('../config');
const Panel = require('../models/panelModel');

router.post('/getPaneles', async function (req, res){
    try {
        const { leccionId } = req.body;
        console.log(leccionId,'asd');
        const panels = await Panel.find({leccionId: leccionId });
        res.status(200).json(panels);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener los paneles' });
    }
});

router.post('/getPanel', async function (req, res){
    try {
        const { panelId } = req.body;
        const panels = await Panel.findOne({_id: panelId });
        res.status(200).json(panels);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener los paneles' });
    }
});

router.post('/getNextPanel', async function (req, res){
    try {
        const { panelId } = req.body;
        const panelCurrent = await Panel.findOne({_id: panelId });
        const panelNext = await Panel.findOne({orden: panelCurrent.orden+1 });
        if(panelNext!=null){
            res.status(200).json(panelNext);
        }
        res.status(500).json();
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener los paneles' });
    }
});


module.exports = router;
