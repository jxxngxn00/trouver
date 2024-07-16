import db from '../database/db.js'; // 데이터베이스 연결 설정

export const signUp = (data) => {
    return new Promise((resolve, reject) => {
        db.query(`INSERT INTO user (userID, userPW) VALUES (?, ?) `, [data[0], data[1]], (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
};

// 여행 장소 목록 불러오기
export const getPlaces = async () => {
    const query = `SELECT pla_name, pla_keyword from place`;
    const [rows] = db.query(query);
    return rows;
};

export default getPlaces;