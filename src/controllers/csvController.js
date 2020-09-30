const express = require("express");
const multer = require("multer");
const router = express.Router();
const csv = require("csv-parser")
const fs = require("fs")

router.post("/", async (req, res) => {
    // const products = require("./node.csv")    

    try {        
        var csvData=[];
        fs.createReadStream(req.file.path)
        .pipe(csv())
        .on('data', function(data){
            try {
                // console.log("Name is: "+data.NAME);
                // console.log("Age is: "+data.AGE);
                    console.log(data)
                //perform the operation
            }
            catch(err) {
                //error handler
            }
        })
        .on('end',function(){
            //some final operation
        });  

        return res.status(200).send({csvData})
 
    }
    catch (err) {
        console.log(err)
        return res.status(400).send({ error: err })
    }
})

// router.post("/", async (req, res) => {

//     try {
        
//         const { message } = req.body       

//         return res.status(200).send({message})
 
//     }
//     catch (err) {
//         console.log(err)
//         return res.status(400).send({ error: err })
//     }
// })



module.exports = app => app.use("/csv", router);