// src/server.js
import express from "express";
import cors from "cors";

// Import Router
import placeRoutes from "./routes/place.js";
import planRoutes from "./routes/plan.js";
import api from "./api.js";


import bodyParser from "body-parser";

const app = express();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extends : true }))
app.use(express.json());

// Routes
app.use("/api", api);
app.use("/api/place", placeRoutes);
app.use("/api/plan", planRoutes);
app.use("/api/review");

// ML
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

// Error
app.get('*', (req,res) => {
    res.status(404).render('404');
})
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));