// src/server.js
import express from "express";
import api from "./api.js";
import axios from "axios";

const app = express();
const PORT = process.env.PORT || 5000;
// const db_port = 3001; // React의 포트번호와 다르게 하기 위해

app.use("/api", api);
app.use(express.json());

app.post('/recommend', async (req,res) => {
    try {
        const useData = req.body;
        const response = await axios.post('http://localhost:5001/predict', userData);
        const recommendations = response.data;
        res.json(recommendations);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.listen(PORT, () => console.log(`${PORT} 포트에서 서버 작동 !!`));