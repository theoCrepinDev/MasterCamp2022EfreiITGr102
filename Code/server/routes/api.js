const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const bcrypt = require('bcrypt');

module.exports = router;



  //Inscription d'un nouvel utilisateur
  router.post('/register', async (req, res) => {
    const nom = req.body.nom
    const prenom = req.body.prenom
    const email = req.body.email
    const password = req.body.motDePasse
    const hash = await bcrypt.hash(password, 10);
    var type = 'user'
  
    //on regarde si cet utilisateur existe déjà
    var sql ='SELECT * FROM user WHERE mail= ?'
    var value = [email]
    await db.query(sql, [value], async (err,result, fields) => {
        if (err) throw err;
        if(result.length > 0){
            res.status(401).json({
                message: 'Utilisateur déjà enregistré, essayez de vous connecter !'
            })
            return
        }
        else{
            var sql = 'INSERT INTO user ( nom,prenom,email, password, type) VALUES ?'
            var value =[[email, hash, type]];
            await db.query(sql, [value], function(err,result) {
                if (err) throw err;
                res.send('il est enregistré')
            })
            return true
        }
    })
  })