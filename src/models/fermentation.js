const mongoose = require("../database");

const dbFermentation = new mongoose.Schema({
    temperatura: {
        type: String,
    },
    umidade: {
        type: String,
    },
    codigo: {
        type: String,
    },
    lote: {
        type: String,
    },
    conta: {
        type: String,
        
    },    
    criado_em: {
        type: Date,
        default: Date.now
    }
})

const Fermentation = mongoose.model("dbFermentation", dbFermentation)

module.exports = Fermentation