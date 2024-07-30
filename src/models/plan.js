import db from '../database/db.js'; // 데이터베이스 연결 설정

// 일정 Insert :: Plan
export const MinsertPlan = (data, res) => {
    try {
        const sql = `
            INSERT INTO plan(plan_start, plan_end, plan_budget, plan_tag, user_id) 
            VALUES (?, ?, ?, ?, uuid_to_bin(?))
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

// 방금 insert한 plan 받아옴
export const MgetPlanId = (req, res) => {
    try {
        const sql = `
            SELECT p.plan_uuid as plan_uuid
            from ( 
                select bin_to_uuid(plan_id) as plan_uuid, user_id, RANK() over(order by plan_reg desc) as rn from plan 
            ) as p
            where rn = 1 AND bin_to_uuid(p.user_id) = ?
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

export const MgetDatePlanId = (data, res) => {
    return new Promise((resolve, reject) => {
        const inputData = [data.plan_id, data.user_id];
        try {
            const sql = `
                SELECT dpp.date_plan_id as date_plan_id
                FROM ( 
                    SELECT bin_to_uuid(date_plan_id) as date_plan_id, 
                    p.user_id as user_id, date_plan_date, dp.plan_id as plan_id
                    FROM date_plan dp
                    LEFT join plan p 
                    on dp.plan_id = p.plan_id
                ) as dpp
                WHERE bin_to_uuid(dpp.plan_id) = ? AND bin_to_uuid(dpp.user_id) = ?
                ORDER BY date_plan_date;
            `;
            db.query(sql, inputData, (err, rows) => {
                if (err) {
                    console.error('Database query error : ', err);
                    res.status(500).send('Database query error');
                    reject(err);
                    return;
                };
                resolve(rows);
            })
        } catch (error) {
            console.error('Error : ', error);
            res.status(500).send('Server error');
        }
    });
}

// 일정 Insert :: date_plan (일차별 일정 테이블)
export const MinsertDatePlan = (data, res) => {
    const inputData = [data.plan_id, data.date_plan_date];
    try {
        const sql = `INSERT INTO date_plan(plan_id, date_plan_date) 
        VALUES (uuid_to_bin(?), 
        STR_TO_DATE(REPLACE(REPLACE(?, 'T', ' '), 'Z', ''), '%Y-%m-%d %H:%i:%s.%f'))
        `;
        db.query(sql, inputData, (err, rows) => {
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

// 일정 Insert :: Route (알차별 여행지 테이블)
export const MinsertRoute = (data, res) => {
    const inputData = [data.date_plan_id, data.pla_id, data.route_index, 
        data.route_tip || ""
    ];
    try {
        const sql = `INSERT INTO route(date_plan_id, pla_id, route_index, route_tip) 
        VALUES ( uuid_to_bin(?), uuid_to_bin(?), ?, ?)
        `;
        db.query(sql, inputData, (err, rows) => {
            if (err) {
                console.error('Database query error : ', err);
                res.status(500).send('Database query error');
                return;
            };
            return;
        })
    } catch (error) {
        console.error('Error : ', error);
        res.status(500).send('Server error');
    }
};

// 일정 목록 보기 :: 최신순
export const MgetPlanList = (req, res) => {
    try {
        const sql = `
            SELECT 
                bin_to_uuid(p.plan_id) as plan_uuid,
                u.user_name, 
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
            LEFT JOIN 
                user u ON p.user_id = u.user_id
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
            WHERE 
                p.plan_is_deleted IS NULL
            ORDER BY 
                p.plan_reg DESC
        `;
        db.query(sql, [req.params.id], (err, rows) => {
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

// 일정 상세 보기 :: planDB
export const MgetPlan = (req, res) => {
    return new Promise((resolve, reject) => {
        try {
            const sql = `
                SELECT BIN_TO_UUID(p.plan_id) as plan_id , u.user_name, 
                BIN_TO_UUID(u.user_id) as user_id,
                p.plan_title , p.plan_start , p.plan_end , 
                p.plan_saved, p.plan_budget
                FROM plan p
                LEFT JOIN user u
                ON p.user_id = u.user_id
                WHERE BIN_TO_UUID(p.plan_id) = ?
            `;
            db.query(sql, [req.params.id], (err, rows) => {
                if (err) {
                    console.error('Database query error : ', err);
                    reject('Database query error');
                } else {
                    // console.log(">> plan result :: ", rows);
                    resolve(rows);
                }
            });
        } catch (error) {
            console.error('Error : ', error);
            reject('Server error');
        }
    });
}

// 일정 상세 보기 :: date_plan
export const MgetDatePlan = (req, res) => {
    return new Promise((resolve, reject) => {
        try {
            const sql = `
                SELECT plan_id, 
                    BIN_TO_UUID(date_plan_id) as date_plan_uuid, 
                    DATE_FORMAT(date_plan_date, '%Y년 %m월 %d일') as date_plan_date,
                    DATE_FORMAT(date_plan_date, '%w') as week_n
                FROM date_plan 
                WHERE BIN_TO_UUID(plan_id) = ?
            `;
            db.query(sql, [req.params.id], (err, rows) => {
                if (err) {
                    console.error('Database query error : ', err);
                    reject('Database query error');
                } else {
                    // console.log(">> date plan result :: ", rows);
                    resolve(rows);
                }
            });
        } catch (error) {
            console.error('Error : ', error);
            reject('Server error');
        }
    });
};

// 일정 상세 보기 :: route
export const MgetRoute = (req, res) => {
    return new Promise((resolve, reject) => {
        try {
            const sql = `
                select 
                    *, 
                    BIN_TO_UUID(dp.date_plan_id) as date_plan_uuid,
                    BIN_TO_UUID(rp.date_plan_id) as route_date_plan_uuid,
                    BIN_TO_UUID(rp.pla_id) as route_pla_id
                from (SELECT r.date_plan_id as date_plan_id, 
                        r.pla_id as pla_id, 
                        r.route_id as route_id,
                        r.route_index as route_index,
                        r.route_tip as route_tip,
                        p.pla_name as pla_name, 
                        p.pla_addr1 as pla_addr1, 
                        p.pla_cate as pla_cate, 
                        p.pla_rate_avg as pla_rate_avg, 
                        p.pla_image as pla_image 
                    FROM route r
                    LEFT JOIN place p
                    ON r.pla_id = p.pla_id) rp
                left join date_plan dp 
                on dp.date_plan_id = rp.date_plan_id
                where BIN_to_uuid(dp.plan_id) = ?
            `;
            db.query(sql, [req.params.id], (err, rows) => {
                if (err) {
                    console.error('Database query error : ', err);
                    reject('Database query error');
                } else {
                    // console.log(">> route result :: ", rows);
                    resolve(rows);
                }
            });
        } catch (error) {
            console.error('Error : ', error);
            reject('Server error');
        }
    });
}

// 일정 Update :: Plan
export const MupdatePlan = (data, res) => {
    const inputData = [
        data.plan_title, data.plan_start, data.plan_end, data.plan_tag,
        data.plan_budget, data.plan_id
    ]

    try {
        const sql = `
            UPDATE plan
            SET plan_title = ?,
                plan_start = STR_TO_DATE(REPLACE(REPLACE(?, 'T', ' '), 'Z', ''), '%Y-%m-%d %H:%i:%s.%f'),
                plan_end = STR_TO_DATE(REPLACE(REPLACE(?, 'T', ' '), 'Z', ''), '%Y-%m-%d %H:%i:%s.%f'),
                plan_tag = ?,
                plan_budget = ?,
                plan_edit_date = CURRENT_TIMESTAMP
            WHERE bin_to_uuid(plan_id) = ?
        `;
        db.query(sql, inputData, (err, rows) => {
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
}

// 일정 Update :: DatePlan
export const MupdateDatePlan = (req, res) => {

}

// 일정 Update :: route
export const MupdateRoute = (req, res) => {

}


// 일정 Delete
export const MdeletePlan = (req, res) => {
    try {
        const sql = `
            UPDATE plan
            SET plan_is_delete = CURRENT_TIMESTAMP
            WHERE plan_id = ? AND user_id = ?
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
}

// 조회수 증가
export const MupdateHits = (req, res) => {
    try {
        const sql = `
            UPDATE plan
            SET plan_hit = plan_hit + 1
            WHERE BIN_TO_UUID(plan_id) = ?
        `;
        db.query(sql, [req.params.id], (err, row) => {
            if (err) {
                console.error('Database query error : ', err);
                res.status(500).send('Database query error');
            };
        })
    } catch (error) {
        console.error("Error : ", error);
        res.status(500).send('Server error');
    }
}

// 내 일정 보기
export const MgetMyPlan = (req, res) => {
    
}