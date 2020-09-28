const mongoose = require("mongoose");

const new_uri = process.env.DB_URL

mongoose.connect(new_uri, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;

module.exports = mongoose