// src/server.js
import express from "express";
import api from "./api.js";
import db from "./database/db.js"

const app = express();
const PORT = 5000;
// const db_port = 3001; // React의 포트번호와 다르게 하기 위해

app.use("/api", api);

app.listen(PORT, () => console.log(`${PORT} 포트에서 서버 작동 !!`));