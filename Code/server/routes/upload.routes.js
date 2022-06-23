const express = require('express');
const routerFile = express.Router();
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
        cb (null, '../code/server/files')
    },
    filename: (req, file, cb) => {
        //supprimer les espaces
        const name  = file.originalname.split(" ").join("_")
        const extension = MIME_TYPE[file.mimetype];
        cb(null , name + "_" + Date.now() + "." + extension);
    }
})


//Route pour upload

const upload = multer({ storage: storage, limits: { fieldSize: 10 * 1024 * 1024 } });


//poster fichier
routerFile.post('/file-upload', upload.single('file'), async (req, res, next) => {            
        const url = req.protocol + '://' + req.get('host')
        const reqFiles =  url + "/files/" + req.file.filename 
        res.status(200).json({
            message: "Fichier upload avec succé",
            fileURI : reqFiles
        });
});

module.exports  = routerFile