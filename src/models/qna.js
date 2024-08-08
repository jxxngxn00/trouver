import db from '../database/db.js';

// Insert
export const MinsertQna = (data, res) => {
    try {
        const sql = `
            INSERT INTO qna(
             user_id, q_content, q_cate ) 
            VALUES (uuid_to_bin(?), ?, ?)
        `;
        db.query(sql, data, (err, rows) => {
            if (err) {
                console.error('Database query error : ', err);
                res.status(500).send('Database query error');
                return;
            } else {
                console.log('>>> insertQna 완료 :: ', rows);
            };
        })
    } catch (error) {
        console.error('Error : ', error);
        res.status(500).send('Server error');
    }
};

// select List
export const MgetQnaList = (data, res) => {
    try {
        const sql = `
            SELECT BIN_TO_UUID(q_id) as q_id, 
            q_date, q_cate, q_answer
            FROM qna
            WHERE BIN_TO_UUID(user_id) = ? AND q_is_deleted IS NULL
        `;
        db.query(sql, data, (err, rows) => {
            if (err) {
                console.error('Database query error : ', err);
                res.status(500).send('Database query error');
            } else {
                res.send(rows);
            };
        })
    } catch (error) {
        console.error('Error : ', error);
        res.status(500).send('Server error');
    }
};
// select Detail
export const MgetQnaDetail = (data, res) => {
    try {
        const sql = `
            SELECT BIN_TO_UUID(q_id) as q_id, 
                q_date, q_cate, q_answer,
                q_content, q_edit_date
            FROM qna
            WHERE BIN_TO_UUID(q_id) = ?
        `;
        db.query(sql, data, (err, row) => {
            if (err) {
                console.error('Database query error : ', err);
                res.status(500).send('Database query error');
                return;
            } else {
                res.send(row);
            };
        })
    } catch (error) {
        console.error('Error : ', error);
        res.status(500).send('Server error');
    }
};
// Update
export const MupdateQna= (data, res) => {
    try {
        const sql = `
            UPDATE qna
            SET q_cate = ?,
                q_content = ?,
                q_edit_date = CURRENT_TIMESTAMP
            WHERE bin_to_uuid(q_id) = ? AND BIN_TO_UUID(user_id) = ?
        `;
        db.query(sql, data, (err, rows) => {
            if (err) {
                console.error('Database query error : ', err);
                res.status(500).send('Database query error');
                return;
            };
        })
    } catch (error) {
        console.error('Error : ', error);
        res.status(500).send('Server error');
    }
};

// Delete
export const MdeleteQna= (data, res) => {
    try {
        const sql = `
            UPDATE qna
            SET q_is_deleted = CURRENT_TIMESTAMP
            WHERE bin_to_uuid(q_id) = ? AND BIN_TO_UUID(user_id) = ?
        `;
        db.query(sql, data, (err, rows) => {
            if (err) {
                console.error('Database query error : ', err);
                res.status(500).send('Database query error');
                return;
            };
        })
    } catch (error) {
        console.error('Error : ', error);
        res.status(500).send('Server error');
    }
};
// answer_qna (추가 기능 사항)