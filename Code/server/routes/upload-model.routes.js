const express = require('express');
const routerFile = express.Router();
const path = require("path");
const fs = require('fs');
const DIR = '../public';

const multer = require('multer');
var id;
var CNI;

//dictionnaire mine type

// const MIME_TYPE= {
//     "image/jpg" : "jpg",
//     "image/jpeg" : "jpg",
//     "image/png" : "png",
//     "application/pdf" : "pdf"
// }

// //la destination du fichier et générer nom de fichier unique
// var storage = multer.diskStorage({
//     //destination stockage fichier
//     destination: (req, file, cb) => {
//         cb (null, '../code/server/files/')
//     },
//     filename: (req, file, cb) => {
//         //supprimer les espaces
//         const extension = MIME_TYPE[file.mimetype];
//         cb(null , CNI + id + "." + extension);
//     }
// })


//Route pour upload

// const upload = multer({ storage: storage, limits: { fieldSize: 10 * 1024 * 1024 } });


//poster fichier
routerFile.post('/model-upload/:numeroModel/:CNI',  async (req, res, next) => {            
        // id = req.params.numeroModel;
        // CNI = req.params.CNI
        // console.log(req.body)
        // const url = req.protocol + '://' + req.get('host')
        // const reqFiles =  url + "/files/" + req.file.filename
        // console.log(reqFiles)
        // res.status(200).json({
        //     message: "Fichier upload avec succé",
        //     fileURI : reqFiles
        // });



        var matches = req.body.file.match(/^data:([A-Za-z-+/]+);base64,(.+)$/),
response = {};
 
if (matches.length !== 3) {
return new Error('Invalid input string');
}
 
response.type = matches[1];
response.data = Buffer.from(matches[2], 'base64');
let decodedImg = response;
let imageBuffer = decodedImg.data;
let type = decodedImg.type;
let extension = 'jpg';
let fileName = req.params.CNI + req.params.numeroModel + '.' + extension;
try {
fs.writeFileSync(__dirname + "/../files/labeled_images/" + fileName, imageBuffer, 'utf8');
return res.send({"status":"success"});
} catch (e) {
next(e);
}
});

module.exports  = routerFile