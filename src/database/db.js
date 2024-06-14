// src/database/db.js

// const mysql = require('mysql');
import mysql from 'mysql';

const conn = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '1234',
    database: 'trouver'
});

conn.connect((err) => {
    if (err) console.log(err);
    else console.log('>> Connected to the database');
});

// module.exports = conn;
export default conn;