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
}

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

// 방금 insert한 date_plan id 받아옴
export const MgetDatePlanId = (req, res) => {
    try {
        const sql = `
            SELECT u.user_uuid 
            from ( 
                select bin_to_uuid(user_id) as user_uuid, RANK() over(order by user_register desc) as rn from user 
            ) as u 
            where rn = 1 AND user_id = ?
        `;
        db.query(sql, (err, row) => {
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