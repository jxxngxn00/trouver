import db from '../database/db.js'; // 데이터베이스 연결 설정

exports.signUp = (data) => {
    return new Promise((resolve, reject) => {
        db.query(`INSERT INTO user (userID, userPW) VALUES (?, ?) `, [data[0], data[1]], (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
};

exports.getUserUUID = (user_login_id) => {
    try {
        const sql = `
            SELECT bin_to_uuid(user_id)
            from user
            where user_login_id = ?
        `;
        db.query(sql, (err, row) => {
            if (err) {
                console.error('Database query error : ', err);
                res.status(500).send('Database query error');
                return;
            };
            res.send(row);
        })
    } catch (error) {
        console.error('Error : ', error);
        res.status(500).send('Server error');
    }
}