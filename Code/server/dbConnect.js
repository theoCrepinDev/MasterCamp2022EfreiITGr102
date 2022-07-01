const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Tekxover123?',
    database: 'db_mastercamp'
});

module.exports = db;