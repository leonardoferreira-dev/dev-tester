require('dotenv').config();

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
const app = express()

app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan("dev"));

require("../src/controllers/importAddProduct")(app);
require("../src/controllers/fermentationController")(app);
require("../src/controllers/sensorController")(app);
require("../src/controllers/productsController")(app);


app.listen(3030)

// app.listen(process.env.PORT || 3333)