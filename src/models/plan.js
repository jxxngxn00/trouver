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
            SELECT bin_to_uuid(p.plan_id) as plan_uuid, u.user_name , p.plan_title, p.plan_reg,
                p.plan_start, p.plan_end, p.plan_tag, p.plan_budget, p.plan_saved
            from plan p
            LEFT join user u
            on p.user_id = u.user_id
            ORDER BY p.plan_reg DESC
            WHERE !p.plan_is_deleted
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
}
// 일정 상세 보기
export const MgetPlan = (req, res) => {
    try {
        const sql = `
            SELECT bin_to_uuid(p.plan_id) as plan_uuid, u.user_name , p.plan_title, p.plan_reg,
                p.plan_start, p.plan_end, p.plan_tag, p.plan_budget, p.plan_saved
            from plan p
            LEFT join user u
            on p.user_id = u.user_id
            WHERE bin_to_uuid(p.plan_id) = %s
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