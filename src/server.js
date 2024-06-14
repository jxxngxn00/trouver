// src/server.js
import express from "express";
import api from "./api.js";
import db from "./database/db.js"

const app = express();
const PORT = 5000;
// const db_port = 3001; // React의 포트번호와 다르게 하기 위해

app.use("/api", api);
// app.use("/app", appjs);

// api.js에 있는 내용
// app.get('/', (req, res) => {
//     db.query('SELECT BIN_TO_UUID(user_id) as user_id ,user_name, user_phone, user_gender, user_birth, user_mbti, user_pay, user_login_id, user_login_pw FROM user'
//         , function (err, results, fields) {
//             if (err) throw err;
//             console.log('>>> SQL 결과 받아오는 중 ...');
//             res.send(results);
//             console.log(`>>> res :: ${results}`);
//         });
//     });

app.listen(PORT, () => console.log(`${PORT} 포트에서 서버 작동 !!`));