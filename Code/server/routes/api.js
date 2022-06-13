const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const bcrypt = require('bcrypt');

const candidats = require('../data/Candidat.js');

router.get('/candidats', (req, res) => {
    res.json(candidats);
})

module.exports = router;