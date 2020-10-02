
const mongoose = require("../database");

const dbProducts = new mongoose.Schema({
    cf: {
        type: String,
        required: false,
    },
    title: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: false,
    },    
    price: {
        type: Number,
        required: false,
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
        unique: false,
    },
    quantity: {
        type: Number,
        required: false,
    },
},{ timestamps: false })

const Products = mongoose.model("dbProducts", dbProducts)

module.exports = Products