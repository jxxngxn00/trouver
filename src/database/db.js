// src/database/db.js

// const mysql = require('mysql');
import mysql from 'mysql';

const conn = mysql.createConnection({
    host: '192.168.0.36',
    port: '3306',
    user: 'trouver',
    password: '1234',
    database: 'trouver'
});

conn.connect((err) => {
    if (err) console.log(err);
    else console.log('>> Trouver DB 연결');
});

// module.exports = conn;
export default conn;