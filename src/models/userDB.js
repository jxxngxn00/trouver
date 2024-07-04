import db from '../database/db'; // 데이터베이스 연결 설정

exports.signUp = (data) => {
    return new Promise((resolve, reject) => {
        db.query(`INSERT INTO user (userID, userPW) VALUES (?, ?) `, [data[0], data[1]], (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
};