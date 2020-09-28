const express = require("express");
const router = express.Router();
const Sensor = require("../models/sensor");

router.post("/setSensor/", async (req, res) => {
    try {
        const {codigo_sensor, conta } = req.body;
        

        const verificarConta = await Sensor.find({"codigo_sensor": codigo_sensor});        

        if(verificarConta.length > 0) return res.json({resposta: 'Este sensor já foi cadastrado'})
       
        const sensor = await Sensor.create({codigo_sensor, conta})

        return res.send(sensor);
    }
    catch (err) {    
        return res.status(400).json({err })   
    }
})

module.exports = app => app.use("/", router);