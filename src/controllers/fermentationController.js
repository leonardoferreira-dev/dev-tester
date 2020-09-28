const express = require("express");
const router = express.Router();
const axios = require("axios");
const Fermentation = require("../models/fermentation");
const Sensor = require("../models/sensor");

const api = process.env.AGROGER_API;
const modo = process.env.AGROGER_MODO;
const user = process.env.AGROGER_USER;
const password = process.env.AGROGER_PASSWORD;
const chave = process.env.AGROGER_KEY;

const options = {
    headers: { 'Content-Type': 'application/json' },
};

router.post("/setFermentacao/", async (req, res) => {   
   
    const {umidade = "1", temperatura, codigo} = req.body[0];

    if(!umidade, !temperatura || !codigo ) return res.json({resposta: 'Dados incompletos'});   
   
    const sensor = await Sensor.find({"codigo_sensor": codigo});

    console.log(sensor)

    const data = JSON.stringify({chave, modo})

    const {data: {lotes}} = await axios.post(api, data, options);   

    if(!lotes[codigo]) return res.json({resposta: 'Não foi possível localizar o sensor nos tanques de fermentação'})

    if(lotes[codigo].length == 0) return res.json({resposta: 'O sensor não está vinculado em um lote'})
      
    try {               
       
        const fermentation = await Fermentation.create({umidade, temperatura, conta: sensor[0].conta, codigo, lote: lotes[codigo][0].id})

        return res.json(fermentation);
    }
    catch (err) {
        console.log(err)
        return res.status(400).send({ erro: err })   
    }
})

router.get("/getFermentacoes/:conta/:lote", async (req, res) => {

    try {

        const { conta, lote } = req.params

        const fermentacoes = await Fermentation.find({"conta": conta, "lote": lote})
        return res.send(fermentacoes);
    }
    catch (err) {
        return res.status(400).send({ erro: err })
    }
});

module.exports = app => app.use("/", router);