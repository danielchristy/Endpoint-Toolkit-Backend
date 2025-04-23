import dotenv from "dotenv";

import express from "express";
import cors from "cors";
import axios from "axios";

dotenv.config();

const app = express();
const PORT = 3001;
app.use(cors());

const CAREER_ONE_STOP_KEY = process.env.COS_API_KEY;
const CAREER_ONE_STOP_ID = process.env.COS_API_ID;

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

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
