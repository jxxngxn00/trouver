import db from '../database/db.js'; // 데이터베이스 연결 설정

/* 여행지 북마크 */
// 여행지 북마크 추가
export const MsavePlace = (req, res) => {
    try {
        const sql = `
            INSERT INTO saved_place(user_id, pla_id) 
            VALUES (uuid_to_bin('0eb6e69c-47cc-11ef-b3c9-7085c2d2eea0'), uuid_to_bin(?))
        `;
        db.query(sql, [req.params.plaId], (err, rows) => {
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

// 여행지 북마크 해제
export const MunsavePlace = (req, res) => {
    console.log(req.params.plaId);
    try {
        const sql = `
            DELETE FROM saved_place
            WHERE bin_to_uuid(pla_id) = ? AND bin_to_uuid(user_id) = '0eb6e69c-47cc-11ef-b3c9-7085c2d2eea0'
        `;
        db.query(sql, [req.params.plaId], (err, rows) => {
            if (err) {
                console.error('Database query error : ', err);
                res.status(500).send('Database query error');
                return;
            };
            // console.log(">>> MunsavePlace result : ",rows);
        })
    } catch (error) {
        console.error('Error : ', error);
        res.status(500).send('Server error');
    }
};

// 사용자별 여행지 북마크 상태 확인
export const MisSavedPlace = (data, res) => {
    try {
        const sql = `
            SELECT count(sp_id) as saved
            FROM saved_place
            WHERE BIN_TO_UUID(pla_id) = ? AND BIN_TO_UUID(user_id) = ?
        `;
        db.query(sql, data, (err, row) => {
            if (err) {
                console.error('Database query error : ', err);
                res.status(500).send('Database query error');
                return;
            } else {
                console.log(row[0]);
                res.send({ saved : row[0].saved });
            }
        })
    } catch (error) {
        console.error('Error : ', error);
        res.status(500).send('Server error');
    } 
}

// 여행지의 북마크 수 증가
export const MupdatePlaceSavePlus = (req, res) => {
    try {
        const sql = `
            UPDATE place
            SET pla_saved = pla_saved + 1
            WHERE BIN_TO_UUID(pla_id) = ?
        `;
        db.query(sql, [req.params.plaId], (err, row) => {
            if (err) {
                console.error('Database query error : ', err);
                res.status(500).send('Database query error');
                return;
            } else {
                return row;
            }
        })
    } catch (error) {
        console.error('Error : ', error);
        res.status(500).send('Server error');
    } 
}

// 여행지의 북마크 수 감소
export const MupdatePlaceSaveMinus = (req, res) => {
    try {
        const sql = `
            UPDATE place
            SET pla_saved = pla_saved - 1
            WHERE BIN_TO_UUID(pla_id) = ?
        `;
        db.query(sql, [req.params.plaId], (err, row) => {
            if (err) {
                console.error('Database query error : ', err);
                res.status(500).send('Database query error');
                return;
            } else {
                return row;
            }
        })
    } catch (error) {
        console.error('Error : ', error);
        res.status(500).send('Server error');
    } 
}

/* 일정 북마크 */
// 일정 북마크 추가
export const MsavePlan = (req, res) => {
    try {
        const sql = `
            INSERT INTO saved_plan(user_id, plan_id) 
            VALUES (uuid_to_bin('0eb6e69c-47cc-11ef-b3c9-7085c2d2eea0'), uuid_to_bin(?))
        `;
        db.query(sql,[req.params.planId], (err, rows) => {
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

// 일정 북마크 해제
export const MunsavePlan = (req, res) => {
    try {
        const sql = `
            DELETE FROM saved_plan
            WHERE BIN_TO_UUID(plan_id) = ? 
                AND BIN_TO_UUID(user_id) = '0eb6e69c-47cc-11ef-b3c9-7085c2d2eea0'
        `;
        db.query(sql, [req.params.planId], (err, rows) => {
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

// 사용자별 일정 북마크 상태 확인
export const MisSavedPlan = (data, res) => {
    try {
        const sql = `
            SELECT count(s_id) as saved
            FROM saved_plan
            WHERE BIN_TO_UUID(plan_id) = ? AND BIN_TO_UUID(user_id) = ?
        `;
        db.query(sql, data, (err, row) => {
            if (err) {
                console.error('Database query error : ', err);
                res.status(500).send('Database query error');
                return;
            } else {
                return row;
            }
        })
    } catch (error) {
        console.error('Error : ', error);
        res.status(500).send('Server error');
    } 
}

// 일정의 북마크 수 증가
export const MupdatePlanSavePlus = (req, res) => {
    try {
        const sql = `
            UPDATE plan
            SET plan_saved = plan_saved + 1
            WHERE BIN_TO_UUID(plan_id) = ?
        `;
        db.query(sql, [req.params.planId], (err, row) => {
            if (err) {
                console.error('Database query error : ', err);
                res.status(500).send('Database query error');
                return;
            } else {
                return row;
            }
        })
    } catch (error) {
        console.error('Error : ', error);
        res.status(500).send('Server error');
    } 
}

// 일정의 북마크 수 감소
export const MupdatePlanSaveMinus = (req, res) => {
    try {
        const sql = `
            UPDATE plan
            SET plan_saved = plan_saved - 1
            WHERE BIN_TO_UUID(plan_id) = ?
        `;
        db.query(sql, [req.params.planId], (err, row) => {
            if (err) {
                console.error('Database query error : ', err);
                res.status(500).send('Database query error');
                return;
            } else {
                return row;
            }
        })
    } catch (error) {
        console.error('Error : ', error);
        res.status(500).send('Server error');
    } 
}