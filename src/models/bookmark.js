import db from '../database/db.js'; // 데이터베이스 연결 설정
/* Home */
// 북마크 갯수 파악
export const MgetCountSavedPlace = (req, res) => {
    return new Promise((resolve, reject) => {
        try {
            const sql = `
                SELECT COUNT(sp_id) As count
                FROM saved_place
                WHERE BIN_TO_UUID(user_id) = ?
            `;
            db.query(sql, [req.params.id], (err, row) => {
                if (err) {
                    console.error('Database query error : ', err);
                    res.status(500).send('Database query error');
                    reject('Database query error');
                } else {
                    resolve(row[0].count);
                };
            })
        } catch (error) {
            console.error('Error : ', error);
            res.status(500).send('Server error');        
        }
    });
};

export const MgetCountSavedPlan = (req, res) => {
    return new Promise((resolve, reject) => {
        try {
            const sql = `
                SELECT COUNT(s_id) as count
                FROM saved_plan
                WHERE BIN_TO_UUID(user_id) = ?
            `;
            db.query(sql, [req.params.id], (err, row) => {
                if (err) {
                    console.error('Database query error : ', err);
                    res.status(500).send('Database query error');
                    reject('Database query error');
                } else {
                    resolve(row[0].count);
                };
            })
        } catch (error) {
            console.error('Error : ', error);
            res.status(500).send('Server error');        
        }
    });
};

/* 여행지 북마크 */
// 여행지 북마크 추가
export const MsavePlace = (req, res) => {
    const user_id = 'fdb19576-48f1-11ef-bcc9-af0a24947caf'; // mac

    try {
        const sql = `
            INSERT INTO saved_place(user_id, pla_id) 
            VALUES (uuid_to_bin('fdb19576-48f1-11ef-bcc9-af0a24947caf'), uuid_to_bin(?))
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
    // console.log(req.params.plaId);
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
                // console.log(row[0]);
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

// 나의 여행지 북마크
export const MgetMyPlaceBookmark = (req, res) => {
    try {
        const sql = `
            SELECT BIN_TO_UUID(p.pla_id) as pla_uuid , 
                p.pla_name , 
                p.pla_tag ,
                p.pla_addr1 ,
                p.pla_saved
            FROM saved_place sp
            LEFT JOIN place p
            ON sp.pla_id = p.pla_id 
            WHERE BIN_TO_UUID(user_id) = ?
            ORDER BY saved_reg DESC
        `;
        db.query(sql, [req.params.id], (err, row) => {
            if (err) {
                console.error('Database query error : ', err);
                res.status(500).send('Database query error');
                return;
            } else {
                // console.log(row[0]);
                res.send(row);
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
            VALUES (uuid_to_bin('fdb19576-48f1-11ef-bcc9-af0a24947caf'), uuid_to_bin(?))
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
                AND BIN_TO_UUID(user_id) = 'fdb19576-48f1-11ef-bcc9-af0a24947caf'
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

// 나의 일정 북마크
export const MgetMyPlanBookmark = (req, res) => {
    try {
        const sql = `
            SELECT bin_to_uuid(pp.plan_id) as plan_uuid,
                pp.plan_title, 
                pp.plan_reg,
                date_format(pp.plan_start, "%Y-%m-%d") as plan_start, 
                date_format(pp.plan_end, "%Y-%m-%d") as plan_end, 
                pp.plan_tag, 
                pp.plan_budget, 
                pp.plan_saved,
                COALESCE(pp.count_routes, 0) AS count_routes
            FROM saved_plan sp
            LEFT JOIN (
                SELECT 
                    p.plan_id,
                    p.plan_title, 
                    p.plan_reg,
                    date_format(p.plan_start, "%Y-%m-%d") as plan_start, 
                    date_format(p.plan_end, "%Y-%m-%d") as plan_end, 
                    p.plan_tag, 
                    p.plan_budget, 
                    p.plan_saved, 
                    p.plan_is_deleted, 
                    COALESCE(count_routes.count_routes, 0) AS count_routes
                FROM 
                    plan p
                LEFT JOIN (
                    SELECT 
                        dp.plan_id, 
                        COUNT(r.route_id) AS count_routes
                    FROM 
                        route r
                    LEFT JOIN 
                        date_plan dp ON r.date_plan_id = dp.date_plan_id
                    GROUP BY 
                        dp.plan_id
                ) AS count_routes ON p.plan_id = count_routes.plan_id
            ) pp
            ON sp.plan_id = pp.plan_id 
            WHERE BIN_TO_UUID(sp.user_id) = ?
            ORDER BY s_reg DESC
        `;
        db.query(sql, [req.params.id], (err, row) => {
            if (err) {
                console.error('Database query error : ', err);
                res.status(500).send('Database query error');
                return;
            } else {
                // console.log(row);
                res.send(row);
            }
        })
    } catch (error) {
        console.error('Error : ', error);
        res.status(500).send('Server error');
    } 
}