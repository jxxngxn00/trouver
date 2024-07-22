// src/database/db.js
import mysql from 'mysql';

const conn = mysql.createConnection({
    // host: '172.30.1.21',
    host: 'localhost',
    port: '3306',
    user: 'trouver',
    password: '1234',
    database: 'trouver'
});

conn.connect((err) => {
    if (err) console.log(err);
    else console.log('>> MySQL Database Connected Successfully');
});

// module.exports = conn;
export default conn;