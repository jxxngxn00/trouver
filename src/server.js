// src/server.js
import express from "express";
import cors from "cors";
import db from "./database/db.js";

// Import Router
import placeRoutes from "./routes/place.js";
import api from "./api.js";

const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));

// Routes
app.use("/api", api);
app.use("/api/place", placeRoutes);

app.use(express.json());

// app.post('/recommend', async (req,res) => {
    //     try {
        //         const useData = req.body;
        //         const response = await axios.post('http://localhost:5001/predict', userData);
        //         const recommendations = response.data;
        //         res.json(recommendations);
        //     } catch (error) {
            //         res.status(500).send(error.message);
            //     }
            // });
            
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));