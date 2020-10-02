const express = require("express");
const router = express.Router();
const Product = require("../models/products");

const fs = require("fs")
const fast = require('fast-csv');

router.post("/", async (req, res) => {
   
    try {
        
        let dados = []       
        
        fs.createReadStream(__dirname + '/file1.csv')
            .pipe(fast.parse({ headers: false }))
            .on('error', error => console.error(error))
            .on('data', row => dados.push(row[0]))
            .on('end', (rowCount) => {
                console.log(`Parsed ${rowCount} rows`)

                const toObject = dados.map((item) => {                    
                    const [matricula, quantity, unit, price] = item.split(';');
                    //const [cf, matricula, title, cst, unit, price, quantity] = item.split(';');
                    return {matricula, quantity, unit, price}
                }).filter(item => item.unit != "KG");

               return  console.log(toObject)

                // const product = Product.create(toObject)
               
                //return res.status(200).json(product)
            }) 
    }
    
    catch (err) {
        console.log(err)
        return res.status(400).send({ error: err })
    }
})

router.delete("/", async (req, res) => {
    try {
        await Product.remove(); 
        return res.status(200).send({ mensagem: "Removidos com sucesso"})
    }
    catch (err) {
        return res.status(400).send({ erro: err })
    }
})

module.exports = app => app.use("/csv", router);