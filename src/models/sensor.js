const mongoose = require("../database");

const dbSensor = new mongoose.Schema({
    codigo_sensor: {
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

const Sensor = mongoose.model("dbSensor", dbSensor)

module.exports = Sensor