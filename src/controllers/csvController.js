const csv = require('csv-parse');
const fs = require("fs");
const results = [];


fs.createReadStream("node.csv")
    .pipe(csv({}))
    .on('data', (data) => results.push(data))
    .on('end', () => {
        console.log(results)
    });