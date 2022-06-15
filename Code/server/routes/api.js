const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const bcrypt = require('bcrypt');

const Suffrage = require('../data/Suffrage');


//router.get('/suffrage', (req, res) => {
   // res.json(Suffrage)
//})

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

//promise pour récupérer candidat avec id_suffrae
const getCandidtas = (idSuffrage) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT Nom_candidat, Prénom_candidat, Description_candidat, Photo_candidat, Lien_programme_candidat FROM candidat WHERE ID_suffrage="+ idSuffrage, async (err, resultRecupCandidats) => {
            if(err) throw err;
            if(resultRecupCandidats.length < 0){
                reject({
                    message : "Aucun candidat associé à ce suffrage affichage impossible"
                })
            }else{
                console.log("Candidats récupérés");
                resolve(resultRecupCandidats);
            }
        });
    })
}

//promise pour récupérer nombre de votants avec id_suffrage
const getNombreVotants = (idSuffrage) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT count(*) FROM eligible WHERE ID_suffrage = " + idSuffrage, async (err, resultRecupVotantsLength) => {
                
            resolve(resultRecupVotantsLength[0]["count(*)"]);
        })
    })
}

//route pour récupérer les suffrages qui concernent l'ustilisateur connecté.
router.get('/suffrage/:useremail', async (req, res) => {
    //on récupère les info des suffrage qui corresponde à l'user
    db.query("SELECT * FROM suffrage s INNER JOIN eligible e ON e.ID_suffrage = s.ID_suffrage WHERE e.Email ='" + req.params.useremail +"'", async (err, resultRecupSuffrage) => {
        if(err) throw err;
        //on regarde si il y a au moins un suffrage
        if(resultRecupSuffrage.length < 0){
            res.status(204).json({message : "L'utilisateur n'est éligible à aucun vote..."})
        }else{
            
            const idSuffrage = resultRecupSuffrage[0].ID_suffrage;
            var suffrage = {
                nom_suffrage: resultRecupSuffrage[0].Nom_suffrage,
                description_suffrage: resultRecupSuffrage[0].Description_suffrage,
                date_fin_suffrage: resultRecupSuffrage[0].Date_fin_suffrage,
                candidats : [],
                nombre_Votants : 0
            }
            //on récupère les candidats associés
            getCandidtas(idSuffrage)
                .then((response) => {
                    suffrage.candidats = response
                    //on récupère le nombre de votant
                    getNombreVotants(idSuffrage)
                        .then((response) => {
                            suffrage.nombre_Votants = response;
                            console.log("envoit rep")
                            res.status(200).json(suffrage)
                        })
                })
            
        }
    })
})

module.exports = router;