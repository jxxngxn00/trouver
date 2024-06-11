import express from "express";
import api from "./api";
// import appjs from "./App";

const app = express();
const PORT = 5000;

app.use("/api", api);
// app.use("/app", appjs);
app.listen(PORT, () => console.log(PORT+'포트에서 서버 작동 !!'));