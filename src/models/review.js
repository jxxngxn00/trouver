import db from '../database/db.js';


/* 여행지 리뷰 CRUD */
// 여행지 __ 리뷰 Select
export const MgetPlaceReview = (req, res) => {
    try {
        const sql = `
            SELECT BIN_TO_UUID(pla_r_id) as pla_r_uuid, BIN_TO_UUID(u.user_id) as user_uuid, u.user_name as user_name, pla_r_img,
                pla_r_date, pla_r_rate, pla_r_tag, pla_r_content
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

// 여행지 __ 리뷰 Insert
export const MinsertPlaceReview = (req, res) => {
    const { r_img, r_rate, r_tag, r_content } = req.body;

    let pla_r_imgs = [];
    r_img.map((item, idx) => {
        pla_r_imgs = [...pla_r_imgs, item.url];
    });
    const pla_r_img = pla_r_imgs.join('|');
    const pla_r_tag = r_tag.join('/');
    console.log(r_content);
    const user_id = "fdb19576-48f1-11ef-bcc9-af0a24947caf";
    const pla_id = "6491f54a-48f9-11ef-bcc9-af0a24947caf";
    try {
        const sql = `
            INSERT pla_review(user_id, pla_id, pla_r_img, pla_r_rate, pla_r_tag, pla_r_content)
            VALUES(uuid_to_bin(?), uuid_to_bin(?), ?, ?, ?, ?)
        `;
        db.query(sql, [user_id, pla_id, pla_r_img, r_rate, pla_r_tag, r_content], (err, row) => {
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
/* 일정 리뷰 CRUD --end */
export default MgetPlaceReview;
