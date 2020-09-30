const express = require("express");
const router = express.Router();
const Product = require("../models/products");

router.post("/", async (req, res) => {

    try {
        
        const { title, description, price, unit, measure, matricula } = req.body

        const product = await Product.create({ title, description, price,  unit, measure, matricula })

        return res.status(200).send(product)
 
    }
    catch (err) {
        console.log(err)
        return res.status(400).send({ error: err })
    }
})

router.get("/", async (req, res) => {
    try {
       
        const product = await Product.find()
        
        return res.send(product)
    }
    catch (err) {
        return res.status(400).send({ error: err })
    }
});

router.get("/teste", async (req, res) => {
    try {
       
        const { message} = req.body

        //const product = await Product.create({ title, description, price,  unit, measure, matricula })
        return res.send({message})
    }
    catch (err) {
        return res.status(400).send({ error: err })
    }
});

router.get("/promotion/all", async (req, res) => {
    try {
        
        const product = await Product.find({is_promotion: true, company: { $ne: '5f44fe6df96e641de4a7a081'}}).populate([{path:'category', select: ['description']}, {path: 'company', select: ["name"]},{path: 'complements', select: ['description', 'price']}])
        
        return res.send(product)
    }
    catch (err) {
        return res.status(400).send({ error: err })
    }
});

router.put("/:productId", async (req, res) => {
    try {

        const data = req.body;

        if(data._id) delete data._id
        if(data.image) delete data.image

        const product = await Product.findByIdAndUpdate(req.params.productId, data, { new: true })

        return res.send(product)
    }
    catch (err) {
        return res.status(400).send({ error: err })
    }
});

module.exports = app => app.use("/products", router);