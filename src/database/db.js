// src/database/db.js
import mysql from 'mysql';

const conn = mysql.createConnection({
    // host: '172.30.1.21',
    host: process.env.REACT_APP_DB_HOST,
    port: process.env.REACT_APP_DB_PORT,
    user: process.env.REACT_APP_DB_USER,
    password: process.env.REACT_APP_DB_PASSWORD,
    database: 'trouver'
});

conn.connect((err) => {
    if (err) console.log(err);
    else console.log('✅ MySQL Database Connected Successfully');
});

// module.exports = conn;
export default conn;