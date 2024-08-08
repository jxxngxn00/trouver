import db from '../database/db.js';


/* 여행지 리뷰 CRUD */
// 여행지 __ 리뷰 목록 Select
export const MgetPlaceReview = (req, res) => {
    try {
        const sql = `
            SELECT BIN_TO_UUID(pla_r_id) as pla_r_uuid, BIN_TO_UUID(u.user_id) as user_uuid, u.user_name as user_name, pla_r_img,
                pla_r_date, pla_r_rate, pla_r_tag, pla_r_content, pla_r_is_deleted
            FROM pla_review pr
            LEFT JOIN user u
            ON pr.user_id = u.user_id
            WHERE bin_to_uuid(pla_id) = ?
            ORDER BY pla_r_date DESC
        `;
        db.query(sql, [req.params.id], (err, rows) => {
            if (err) {
                console.error('Database query error : ', err);
                res.status(500).send('Database query error');
                return;
            };
            // console.log("result :: ",row);
            res.send(rows);
        })
    } catch (error) {
        console.error('Error : ', error);
        res.status(500).send('Server error');
    }
};

// 여행지 __ 리뷰 상세보기 Select
export const MgetPlaceReviewDetail = (req, res) => {
    try {
        const sql = `
        SELECT BIN_TO_UUID(pla_r_id) as pla_r_uuid, BIN_TO_UUID(user_id) as user_uuid, pla_r_img,
            pla_r_date, pla_r_rate, pla_r_tag, pla_r_content, 
            p.pla_name as pla_name , p.pla_thumb as pla_thumb , p.pla_addr1 as pla_addr, bin_to_uuid(p.pla_id) as pla_id
        FROM pla_review pr
        LEFT JOIN place p
        ON pr.pla_id = p.pla_id 
        WHERE bin_to_uuid(pla_r_id) = ?
        ORDER BY pla_r_date DESC
        `;
        db.query(sql, [req.params.plaRid], (err, rows) => {
            if (err) {
                console.error('Database query error : ', err);
                res.status(500).send('Database query error');
                return;
            };
            // console.log("result :: ",row);
            res.send(rows);
        })
    } catch (error) {
        console.error('Error : ', error);
        res.status(500).send('Server error');
    }
};

// 여행지 __ 리뷰 Insert
export const MinsertPlaceReview = (data, res) => {
    try {
        const sql = `
            INSERT pla_review(user_id, pla_id, pla_r_img, pla_r_rate, pla_r_tag, pla_r_content)
            VALUES(uuid_to_bin(?), uuid_to_bin(?), ?, ?, ?, ?)
        `;
        db.query(sql, data, (err, row) => {
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
export const MupdatePlaceReview = (data, res) => {
    const params = [data.pla_r_img, data.pla_r_rate, data.pla_r_tag, data.pla_r_content, 
        data.pla_r_id, data.pla_r_rate ];
    try {
        const sql = `
            UPDATE pla_review
            SET pla_r_img = ?,
                pla_r_rate = ?,
                pla_r_tag = ?,
                pla_r_content = ?,
                pla_r_edit_date = CURRENT_TIMESTAMP
            WHERE bin_to_uuid(pla_r_id) = ?
        `;
        db.query(sql, params, (err) => {
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
            SET pla_r_is_deleted = CURRENT_TIMESTAMP
            WHERE bin_to_uuid(pla_r_id) = ?
        `;
        db.query(sql, [req.params.plaRid] , (err, row) => {
            if (err) {
                console.error('Database query error : ', err);
                res.status(500).send('Database query error');
                return;
            } else {
                console.log(sql, [req.params.plaRid]);
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
            VALUES(ý± vHñ ï¼É¯ $ |¯, %s, %s, %s, %,s %s)
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
/* 일정 리뷰 CRUD -- end */
/* 마이페이지 리뷰 CRUD */
export const MgetMyReview = (req, res) => {
    try {
        const sql = `
            SELECT BIN_TO_UUID(pla_r_id) as pla_r_uuid, user_id, 
            pla_r_date, pla_r_rate, pla_r_tag, pla_r_content,
            BIN_TO_UUID(pla_id) as pla_id
            FROM pla_review
            WHERE BIN_TO_UUID(user_id) = ? AND pla_r_is_deleted IS NULL
            ORDER BY pla_r_date DESC
        `;
        db.query(sql,[req.params.id], (err, rows) => {
            if (err) {
                console.error('Database query error : ', err);
                res.status(500).send('Database query error');
                return;
            };
            res.send(rows);
        })
    } catch (error) {
        console.error('Error : ', error);
        res.status(500).send('Server error');
    }
}
/* 마이페이지 리뷰 CRUD -- end */
export default MgetPlaceReview;
