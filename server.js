import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import axios from "axios";

import errorHandler from "./middleware/errorHandler.js"
import userRoutes from "./routes/userRoutes.js";
import careerRoutes from "./routes/careersRoutes.js";
import userRecommendRoutes from "./routes/userRecommendRoutes.js";

dotenv.config();

const app = express();
const PORT = 3001;
const MONGO = process.env.MONGO_URI;
const CAREER_ONE_STOP_KEY = process.env.COS_API_KEY;
const CAREER_ONE_STOP_ID = process.env.COS_API_ID;

const allowedOrigins = [
    'https://devwaypoint.xyz',
    'http://localhost:3000',
];

mongoose.connect(MONGO);

app.use(express.json());
app.use(cors({
    origin: allowedOrigins
}));
app.use("/api/users", userRoutes);
app.use("/api/careers", careerRoutes);
app.use("/api/recommendations", userRecommendRoutes);


app.get("/occupation/:code", async (req, res) => {
    const socCode = req.params.code;
    const url = `https://api.careeronestop.org/v1/occupation/${CAREER_ONE_STOP_ID}/${socCode}/national/0/10`;

    try {
        const response = await axios.get(url, {
            headers: {
                "Authorization": `Bearer ${CAREER_ONE_STOP_KEY}`,
                "Accept": "application/json"
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching data:", error.response?.data || error.message);
        res.status(error.response?.status || 500).json({ error: "Failed to fetch occupation data" });
    }
});

// You have to use the ONETCODE to get the details of the occupation.
app.get("/occupation/details/:code", async (req, res) => {
    const socCode = req.params.code;
    const url = `https://api.careeronestop.org/v1/occupation/${CAREER_ONE_STOP_ID}/${socCode}/MS?training=false&interest=true&videos=false&tasks=false&dwas=false&wages=true&alternateOnetTitles=true&projectedEmployment=true&ooh=false&stateLMILinks=false&relatedOnetTitles=true&skills=false&knowledge=false&ability=false&trainingPrograms=true&industryEmpPattern=true&toolsAndTechnology=false&workValues=false&enableMetaData=false`;

    try {
        const response = await axios.get(url, {
            headers: {
                "Authorization": `Bearer ${CAREER_ONE_STOP_KEY}`,
                "Accept": "application/json"
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching data:", error.response?.data || error.message);
        res.status(error.response?.status || 500).json({ error: "Failed to fetch occupation data" });
    }
});


app.use(errorHandler);

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});

process.on('UnhandledRejection at:', (reason, promise) => {
    console.log('Unhandled Rejection at:', promise, 'reason', reason);
});
