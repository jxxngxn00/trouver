import db from '../database/db.js'; // 데이터베이스 연결 설정

// 일정 Insert :: Plan
export const MinsertPlan = (req, res) => {
    const { date, budget, tags, user_login_id } = req.body;
    const plan_start = date[0];
    const plan_end = date[1];
    const plan_budget = ""+budget[0]+" ~ "+""+budget[1];
    const plan_tag = tags.join(',');
    const data = [plan_start, plan_end, plan_budget, plan_tag, user_login_id];

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
            // res.send(rows);
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
            SELECT p.plan_uuid 
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

// 일정 Insert :: date_plan (일차별 일정 테이블)
export const MinsertDatePlan = (req, res) => {
    try {
        const sql = `INSERT INTO plan(plan) VALUES(date_plan_date) VALUES (?)`;
        db.query(sql, (err, rows) => {
            if (err) {
                console.error('Database query error : ', err);
                res.status(500).send('Database query error');
                return;
            };
            // console.log( rows );
            res.send(rows);
        })
    } catch (error) {
        console.error('Error : ', error);
        res.status(500).send('Server error');
    }
};

// 일정 Insert :: Route (알차별 여행지 테이블)
export const MinsertRoute = (req, res) => {
    try {
        const sql = `INSERT INTO route(date_plan_id, pla_id, route_index, route_tip) VALUES (?)`;
        db.query(sql, (err, rows) => {
            if (err) {
                console.error('Database query error : ', err);
                res.status(500).send('Database query error');
                return;
            };
            // console.log( rows );
            res.send(rows);
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
export const MupdatePlan = (req, res) => {

}

// 일정 Delete
export const MdeletePlan = (req, res) => {
    try {
        const sql = `
            UPDATE plan
            SET plan_is_delete = CURRENT_TIMESTAMP
            WHERE plan_id = %s AND user_id = %s
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