const express = require('express');
const routerFile = express.Router();
const mongoose = require('mongoose');
const path = require("path");

const DIR = '../public';

const multer = require('multer');

//dictionnaire mine type

const MIME_TYPE= {
    "image/jpg" : "jpg",
    "image/jpeg" : "jpg",
    "image/png" : "png",
    "application/pdf" : "pdf"
}

//la destination du fichier et générer nom de fichier unique
var storage = multer.diskStorage({
    //destination stockage fichier
    destination: (req, file, cb) => {
        console.log('....1...')
        cb (null, '../code/server/files')
    },
    filename: (req, file, cb) => {
        //supprimer les espaces
        console.log('...1...');
        const name  = file.originalname.split(" ").join("_")
        
        console.log('...2...');
        const extension = MIME_TYPE[file.mimetype];
        
        console.log('...3...');

        cb(null , name + "_" + Date.now() + "." + extension);
        
        console.log('...4...');
    }
})


//Route pour upload

const upload = multer({ storage: storage, limits: { fieldSize: 10 * 1024 * 1024 } });


//poster fichier
routerFile.post('/file-upload', upload.single('file'), async (req, res, next) => {
        console.log(req.file);
        
        const url = req.protocol + '://' + req.get('host')
        const reqFiles =  url + "/files/" + req.file.filename 
        
        res.status(200).json({
            message: "Fichier upload avec succé",
            fileURI : reqFiles
        });
});

module.exports  = routerFile