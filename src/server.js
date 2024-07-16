// src/server.js
import express from "express";

const app = express();

// Import Router
import placeRoutes from "./routes/placeRoutes.js";

// Routes
app.use("/api/product", placeRoutes);

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