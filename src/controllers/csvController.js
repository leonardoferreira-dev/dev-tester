const express = require("express");
const router = express.Router();
const Product = require("../models/products");

const fs = require("fs")
const fast = require('fast-csv');

router.post("/", async (req, res) => {
   
    try { 
        
        let dados = []
        
        fs.createReadStream('relatorio.csv')
            .pipe(fast.parse({ headers: false }))
            .on('error', error => console.error(error))
            .on('data', row => dados.push(row[0]))
            .on('end', (rowCount) => {
                console.log(`Parsed ${rowCount} rows`)

                const toObject = dados.map((item) => {                    
                    const [title, description, price, unit, measure, matricula ] = item.split(';');
                    return {title, description, price, unit, measure, matricula }
                });

                //const product = Product.create(toObject)
                return console.log(toObject)
                return res.status(200).json(product)
            }) 
    }
    
    catch (err) {
        console.log(err)
        return res.status(400).send({ error: err })
    }
})

module.exports = app => app.use("/csv", router);