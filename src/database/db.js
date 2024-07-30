// src/database/db.js
import mysql from 'mysql2';

const conn = mysql.createConnection({
    // host: '172.30.1.21',
    // host: process.env.REACT_APP_DB_HOST,
    host: 'localhost',
    // port: process.env.REACT_APP_DB_PORT,
    port: 3306,
    // user: process.env.REACT_APP_DB_USER,
    user: 'trouver',
    // password: process.env.REACT_APP_DB_PASSWORD,
    password: '1234',
    // database: process.env.REACT_APP_DB_DATABASE,
    database: 'trouver',
});

conn.connect((err) => {

    if (err) {
        console.log(err);
    }
    else console.log('✅ MySQL Database Connected Successfully');
});

// module.exports = conn;
export default conn;