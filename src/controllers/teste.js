const fs =  require("fs")
const csv = require('csv-parser')
const fast = require('fast-csv');
// import * as fast from "fast-csv"


const stream = fs.createReadStream('node.csv')
    .pipe(fast.parse({ headers: false }))
    .on('error', error => console.error(error))
    .on('data', row => console.log(row))
    .on('end', (rowCount) => console.log(`Parsed ${rowCount} rows`));
                    