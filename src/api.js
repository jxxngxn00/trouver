import express from "express";
import db from "./database/db.js"
const router = express.Router();

// router.get("/", (req, res) => {
//     res.send("안녕하세요 API 입니다.");
// });

router.get('/', (req, res) => {
    db.query('SELECT BIN_TO_UUID(user_id) as user_id ,user_name, user_phone, user_gender, user_birth, user_mbti, user_pay, user_login_id, user_login_pw FROM user'
        , function (err, results, fields) {
            if (err) throw err;
            console.log('>>> SQL 결과 받아오는 중 ...');
            res.send(results);
            // console.log(`>>> res :: ${results}`);
        });
    });

export default router;