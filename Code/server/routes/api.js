const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const bcrypt = require('bcrypt');

const candidats = require('../data/Candidat.js');

router.get('/candidats', (req, res) => {
    res.json(candidats);
})

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Tekxover123?',
    database: 'db_mastercamp'
});

db.connect(function (err) {
    if(err) throw err;
    console.log("Connecté à la base de données !");
})


// Route création d'un suffrage
router.post("/suffrage", async (req, res) => {
    const nomSuffrage = req.body.nom;
    const descriptionSuffrage = req.body.description;
    const datFin = req.body.dateFin;
    const candidatsSuffrage = req.body.candidats;
    const votantsSuffrage = req.body.votants;

    //on va d'abord ajouter les infos du suffrage pour récupérer son id
    db.query("INSERT INTO suffrage (Nom_suffrage, Description_suffrage, Date_fin_suffrage) values ('" + nomSuffrage + "','" + descriptionSuffrage +"','" + datFin +"')", async (err, result) => {
        if(err) throw err;
        //on récupère l'id de ce suffrage pour y insérer les candidats et votants
        db.query("SELECT ID_suffrage FROM suffrage WHERE Nom_suffrage='"+nomSuffrage+"' AND Description_suffrage='"+descriptionSuffrage +"'", async(err, resultRecupID) => {
            if(err)throw err;
            const idSuffrage = resultRecupID[0].ID_suffrage;
            //insertion des candidats
            for(let candidat of candidatsSuffrage){
                db.query("INSERT INTO candidat (ID_suffrage, Nom_candidat,Prénom_candidat,Description_candidat,Photo_candidat) values (" + idSuffrage + ", '"+candidat.nom+"','"+candidat.prenom+"','"+candidat.description+"','"+candidat.photo+"')", async (err, resultPostCandidat) => {
                    if(err) throw err;
                })
            }
            //insertion des votants
            for(let votant of votantsSuffrage){
                db.query("INSERT INTO eligible (ID_suffrage, Email) values ("+ idSuffrage +",'" +  votant
                +"')", async (err, resultPostVotants) => {
                    if(err) throw err;
                })
            }
        })
        res.status(201).json({message:"Suffrage ajouté !"})
    })

})

module.exports = router;