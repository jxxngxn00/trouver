import db from '../database/db.js'; // 데이터베이스 연결 설정

export const mIsSigned = (req, res) => {
    try {
        const sql = `
            SELECT bin_to_uuid(user_id)
            from user
            where user_email = ?
        `;
        db.query(sql, [req.params.email], (err, row) => {
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