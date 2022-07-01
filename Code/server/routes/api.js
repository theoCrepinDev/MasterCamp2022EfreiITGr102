const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAdmin');


const Suffrage = require('../data/Suffrage');

const db = require('../dbConnect');

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
    const heureFin = req.body.heureFin;

    const candidatBlanc = {
        nom : "Blanc",
        prenom : "Vote",
        photo : "https://data.pixiz.com/output/user/frame/preview/400x400/6/8/8/5/1815886_b4cb5.jpg",
        description : "Candidat blanc"
    }

    candidatsSuffrage.push(candidatBlanc);

    //on va d'abord ajouter les infos du suffrage pour récupérer son id
    db.query("INSERT INTO suffrage (Nom_suffrage, Description_suffrage, Date_fin_suffrage, Heure_fin_suffrage) values ('" + nomSuffrage + "','" + descriptionSuffrage +"','" + datFin + "','" + heureFin + "')", async (err, result) => {
        if(err) throw err;
        //on récupère l'id de ce suffrage pour y insérer les candidats et votants
        db.query("SELECT ID_suffrage FROM suffrage WHERE Nom_suffrage='"+nomSuffrage+"' AND Description_suffrage='"+descriptionSuffrage +"'", async(err, resultRecupID) => {
            if(err)throw err;
            const idSuffrage = resultRecupID[0].ID_suffrage;
            db.query("UPDATE utilisateur set ID_candidat = 0 ")
            //insertion des candidats
            for(let candidat of candidatsSuffrage){
                db.query("INSERT INTO candidat (ID_suffrage, Nom_candidat,Prénom_candidat,Description_candidat,Photo_candidat, Programme_candidat) values (" + idSuffrage + ", '"+candidat.nom+"','"+candidat.prenom+"','"+candidat.description+"','"+candidat.photo+ "', '" + candidat.programme +"')", async (err, resultPostCandidat) => {
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
        db.query("SELECT ID_candidat, Nom_candidat, Prénom_candidat, Description_candidat, Photo_candidat, Programme_candidat FROM candidat WHERE ID_suffrage="+ idSuffrage, async (err, resultRecupCandidats) => {
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
const getNombreVotants = () => {
    return new Promise((resolve, reject) => {
        db.query("SELECT count(*) FROM utilisateur " , async (err, resultRecupVotantsLength) => {
                
            resolve(resultRecupVotantsLength[0]["count(*)"]);
        })
    })
}
//route récupérer heure fin suffrage
router.get("/suffrage/heureFin", async (req, res) => {
    db.query("SELECT Heure_fin_suffrage, Date_fin_suffrage FROM suffrage order by ID_suffrage desc limit 1", async (err, resultRecupHeureFin) => {
        if(err) throw err;
        res.json(resultRecupHeureFin);
    })
})

//route pour récupérer le suffrage qui concernent l'ustilisateur connecté.
router.get('/suffrage/:CNI', auth, async (req, res) => {
    //on récupère les info des suffrage qui corresponde à l'user
    db.query("SELECT * FROM suffrage order by ID_suffrage desc limit 1", async (err, resultRecupSuffrage) => {
        if(err) throw err;
        //on regarde si il y a au moins un suffrage
        console.log(resultRecupSuffrage);
        if(resultRecupSuffrage.length <= 0){
            res.status(204).json({message : "L'utilisateur n'est éligible à aucun vote..."})
        }else{
            
            const idSuffrage = resultRecupSuffrage[0].ID_suffrage;
            var suffrage = {
                nom_suffrage: resultRecupSuffrage[0].Nom_suffrage,
                description_suffrage: resultRecupSuffrage[0].Description_suffrage,
                date_fin_suffrage: resultRecupSuffrage[0].Date_fin_suffrage,
                heure_fin_suffrage: resultRecupSuffrage[0].Heure_fin_suffrage,
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
                            res.status(200).json(suffrage)
                })
            })
            
        }
    })
});

//route pour récupérer l'ensemble des numéros CNI de la base de données
router.get('/CNI', async (req, res) => {
    db.query("SELECT No_CNI FROM utilisateur", async (err, resultRecupCNI) => {
        if(err) throw err;
        res.status(200).json(resultRecupCNI)
    })
})


//promise pour vérifier si le votant a déja voté
const verifierEligibilite = (CNI) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT ID_candidat FROM utilisateur WHERE No_CNI='" + CNI + "'", async (err, res) => {
            if(err) reject(err);
            if(res.length <= 0){
                reject({
                    code :1,
                    message:"L'utilisateur n'est pas dans la base de donnée"
                })
            }else{
                if(res[0].ID_candidat != 0){
                    reject({
                        code: 2,
                        message: "L'utilisateur a déjà voté !"
                    })
                }else{
                    resolve({
                        code: 0,
                        message: "ok"
                    })
                }
                
            }
            
        })
    })
}

//promise pour indiquer qu'un votant a voté
const aVote = (CNI, idCandidat) => {
    return new Promise((resolve, reject) => {
        db.query("UPDATE utilisateur SET ID_candidat =" + idCandidat + " WHERE No_CNI = '" + CNI +"'" ,async (err, res) => {
            if(err) reject(err);
            resolve({
                code: 0,
                message : "A voté !"
            });
        } )
    })
}

//promise pour augmenté compteur candidat
const augmenterVoteCandidat = (idCandidat) => {
    return new Promise ((resolve, reject) => {
        db.query("UPDATE candidat set Nombre_vote = (Nombre_vote + 1) where ID_candidat =" + idCandidat, function (err, res) {
            if(err) reject(err);
            resolve({
                code: 0,
                message: "Candidat mis a jour, A voté !"
            })
        })
    })
}

router.post('/voter/:CNI', async (req, res) => {
    const idCandidat = req.body.ID_candidat;
    console.log(idCandidat);
    console.log(req.body)
    verifierEligibilite(req.params.CNI)
        .then((data) => {
            aVote(req.params.CNI, idCandidat)
            .then((data) => {
                augmenterVoteCandidat(idCandidat)
                    .then((data) => {
                        res.status(201).json({
                            code:0,
                            message:'ok!'
                        })
                    })
                    .catch((err) => {
                        res.status(200).json({
                            code:3,
                            message:'Erreur maj nombre vote candidat'
                        })
                        throw err;
                    })
            })
            .catch((err) => {
                res.status(200).json({
                    code:2,
                    message:'Utilisateur a deja voté'
                })
                throw err;
            })
        })
        .catch((probleme) => {
            res.status(200).json(probleme);
        })
})

//route pour récupérer les candidats 
router.get('/candidats', async (req, res) => {
    db.query("SELECT * FROM candidat c where c.ID_suffrage = (SELECT ID_suffrage FROM suffrage order by ID_suffrage desc limit 1)", async (err, resultRecupCandidats) => {
        if(err) throw err;
        console.log(resultRecupCandidats)
        res.status(200).json(resultRecupCandidats)
    })
} )


//Route pour gestion des utilisateurs

// route au chargement de la page pour regarder si le token est valide et récupérer infos
router.get('/utilisateur', auth, async (req, res) => {

            const sql = 'SELECT * FROM utilisateur WHERE No_CNI = ' + req.userCNI;
            db.query(sql, async (err, result) => {
                if(err) throw err;
                const user = {
                    code: 0,
                    message: 'Connexion réussie !',
                    userCNI: result[0].No_CNI,
                    token : req.headers.authorization.split(' ')[1],
                    admin : false
                }
                if(result[0].Admin == 1){
                    user.admin = true
                }
                res.status(200).json(user)
                
            })

})

  //Inscription d'un nouvel utilisateur
router.post('/users', async (req, res) => {
    const nom = req.body.Nom
    const prenom = req.body.Prenom
    const adresse = req.body.adresse
    const CNI = req.body.CNI
    const codePostal = req.body.CodePostal
    const date = req.body.Date
    const prenom2 = req.body.Prenom2
    const sexe = req.body.Sexe
    const ville = req.body.Ville
    const email = req.body.email
    const password = req.body.password
    const hash = await bcrypt.hash(password, 10);
    var type = '0'
  
    //on regarde si cet utilisateur existe déjà
    var sql ='SELECT * FROM utilisateur WHERE No_CNI = ' + CNI
    await db.query(sql, async (err,result, fields) => {
        if (err) throw err;
        if(result.length > 0){
            res.status(401).json({
                code: 1,
                message: 'Utilisateur déjà enregistré, essayez de vous connecter !'
            })
            return
        }
        else{
            var sql = 'INSERT INTO utilisateur ( No_CNI, Nom_user, Prénom_user, Deuxième_Prénom, Sexe, Date_Naissance, Addresse_résidence,Ville_Naissance, Code_Postal, Email, MotDePass, Admin) VALUES ?'
            var value =[[CNI, nom, prenom, prenom2, sexe, date, adresse, ville, codePostal, email, hash, type]];
            await db.query(sql, [value], function(err,result) {
                if (err) throw err;
                res.status(201).json({
                    code: 0,
                    message: 'Utilisateur enregistré !'
                })
            })
            return true
        }
    })
  })

//route connexion d'un utilisateur
router.get('/users/:CNI/:password', async (req, res) => {
    const CNI = req.params.CNI
    const password = req.params.password
    var sql = 'SELECT * FROM utilisateur WHERE No_CNI = ' + CNI
    await db.query(sql, async (err,result, fields) => {
        if (err) throw err;
        if(result.length > 0){
            if(await bcrypt.compare(password, result[0].MotDePass)){
                const user = {
                    code: 0,
                    message: 'Connexion réussie !',
                    userCNI: result[0].No_CNI,
                    token: jwt.sign(
                        {userCNI : result[0].No_CNI},
                        'RANDOM_TOKEN_SECRET',
                        {expiresIn: '24h'}
                    ),
                    admin : false
                }
                if(result[0].Admin == 1){
                    user.admin = true
                }
                res.status(200).json(user)
            }
            else{
                res.status(401).json({
                    code: 1,
                    message: 'Mot de passe incorrect !'
                })
            }
        }
        else{
            res.status(401).json({
                code: 1,
                message: 'Utilisateur non enregistré !'
            })
        }
    })
})

//route pour vérifier l'éligibilité d'un utilisateur
router.get('/verifierEligibilite',authAdmin, async (req, res) => {

    var sql = 'SELECT Admin FROM utilisateur WHERE No_CNI = ' + req.userCNI
            await db.query(sql, async (err,result, fields) => {
                if(err){
                    throw err;
                }
                console.log(result[0].Admin)
                if(result[0].Admin !== 1){
                    res.status(401).json({
                        message: 'Auth failed as Admin',
                        error: new Error('Auth failed as Admin')
                
                        });
                        return;
                }else{
                    res.status(200).json({
                        code: 0,
                        message: 'ok!'
                    })
                }
            })
})

module.exports = router;

