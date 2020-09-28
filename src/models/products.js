
const mongoose = require("../database");

const dbProducts = new mongoose.Schema({
    title: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: true,
    },    
    price: {
        type: String,
        required: true,
    },
    unit: {
        type: String,
        required: false,
    },
    // medida
    measure: {
        type: String,
        required: false,
    },
    // Matricula
    matricula: {
        type: Number,
        required: false,
    },   
},{ timestamps: true })

const Products = mongoose.model("dbProducts", dbProducts)

module.exports = Products