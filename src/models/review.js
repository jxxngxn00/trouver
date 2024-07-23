import db from '../database/db.js';

export const MgetPlaceReview = (req, res) => {
    try {
        const sql = `
            SELECT BIN_TO_UUID(pla_r_id) as pla_r_id, user_id, 
            pla_r_date, pla_r_rate, pla_r_tag, pla_r_content
            FROM pla_review
            ORDER BY pla_r_date DESC
        `;
        db.query(sql, [req.params.id], (err, row) => {
            if (err) {
                console.error('Database query error : ', err);
                res.status(500).send('Database query error');
                return;
            };
            // console.log("result :: ",row);
            res.send(row);
        })
    } catch (error) {
        console.error('Error : ', error);
        res.status(500).send('Server error');
    }
};