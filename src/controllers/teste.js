const fs =  require("fs");
const fast = require('fast-csv');

let dados = []     
        
fs.createReadStream(__dirname + '/file2.csv')
    .pipe(fast.parse({ headers: false }))
    .on('error', error => console.error(error))
    .on('data', row => dados.push(row[0]))
    .on('end', (rowCount) => {        
        console.log(`Parsed ${rowCount} rows`)

        const toObject = dados.map((item) => {                    
            const [matricula, quantity, unit, price] = item.split(';');
            //const [cf, matricula, title, cst, unit, price, quantity] = item.split(';');
            return {matricula, quantity, unit, price}
        }).filter(item => item.unit != "KG" && item.matricula != "");

       return  console.log(toObject)
    }) 