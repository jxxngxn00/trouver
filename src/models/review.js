import db from '../database/db.js';


/* 여행지 리뷰 CRUD */
// 여행지 __ 리뷰 Select
export const MgetPlaceReview = (req, res) => {
    try {
        const sql = `
            SELECT BIN_TO_UUID(pla_r_id) as pla_r_uuid, user_id, 
            pla_r_date, pla_r_rate, pla_r_tag, pla_r_content
            FROM pla_review
            WHERE pla_r_uuid = %s
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

// 여행지 __ 리뷰 Insert
export const MinsertPlaceReview = (req, res) => {
    try {
        const sql = `
            INSERT pla_review(user_id, pla_id, pla_img, pla_r_rate, pla_r_tag, pla_r_content)
            VALUES(%s, %s, %s, %s, %,s %s)
        `;
        db.query(sql, /* 파라미터 들어갈 자리 ,*/ (err, row) => {
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

// 여행지 __ 리뷰 update
export const MupdatePlaceReview = (req, res) => {
    try {
        const sql = `
            UPDATE pla_review
            SET pla_r_img = %s,
                pla_r_rate = %s,
                pla_r_tag = %s,
                pla_r_content = %s,
                pla_r_edit_date = CURRENT_TIMESTAMP
            WHERE pla_r_id = %s AND user_id = %s
        `;
        db.query(sql, /* 파라미터 들어갈 자리 ,*/ (err, row) => {
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

// 여행지 __ 리뷰 delete
export const MdeletePlaceReview = (req, res) => {
    try {
        const sql = `
            UPDATE pla_review
            SET pla_r_is_delete = CURRENT_TIMESTAMP
            WHERE pla_r_id = %s AND user_id = %s
        `;
        db.query(sql, /* 파라미터 들어갈 자리 ,*/ (err, row) => {
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

/* 여행지 리뷰 CRUD -- end */
/* 일정 리뷰 CRUD */
// 일정 __ 리뷰 Select
export const MgetPlanReview = (req, res) => {
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

// 일정 __ 리뷰 Insert
export const MinsertPlanReview = (req, res) => {
    try {
        const sql = `
            INSERT pla_review(user_id, pla_id, pla_img, pla_r_rate, pla_r_tag, pla_r_content)
            VALUES(%s, %s, %s, %s, %,s %s)
        `;
        db.query(sql, /* 파라미터 들어갈 자리 ,*/ (err, row) => {
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

// 일정 __ 리뷰 update
export const MupdatePlanReview = (req, res) => {
    try {
        const sql = `
            UPDATE pla_review
            SET pla_r_img = %s,
                pla_r_rate = %s,
                pla_r_tag = %s,
                pla_r_content = %s,
                pla_r_edit_date = CURRENT_TIMESTAMP
            WHERE pla_r_id = %s AND user_id = %s
        `;
        db.query(sql, /* 파라미터 들어갈 자리 ,*/ (err, row) => {
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

// 일정 __ 리뷰 delete
export const MdeletePlanReview = (req, res) => {
    try {
        const sql = `
            UPDATE pla_review
            SET pla_r_is_delete = CURRENT_TIMESTAMP
            WHERE pla_r_id = %s AND user_id = %s
        `;
        db.query(sql, /* 파라미터 들어갈 자리 ,*/ (err, row) => {
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
/* 일정 리뷰 CRUD --end */
export default MgetPlaceReview;
