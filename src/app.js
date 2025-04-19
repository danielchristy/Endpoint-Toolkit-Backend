import dotenv from "dotenv";

const express = require('express');
const errorHandler = require('../middleware/errorHandler');
const mongoose = require('mongoose');
const cors = require('cors');

dotenv.config();

const APP_URI = process.env.MONGO_URI;
const APP_PORT = process.env.PORT;

const main = async () => {
    const app = express();
    const port = APP_PORT;
    mongoose.connect(APP_URI)
        .then(() => console.log("Connected to MongoDB"))
        .catch((err) => console.error("MongoDB connection error: ", err));

    app.use(express.json());
    app.use(cors());
    app.use("/api/users", require("../routes/userRoutes"));
    app.use("/api/careers", require("../routes/careersRoutes"));
    app.use("/api/apprentices", require("../routes/apprenticeRoutes"));
    app.use("/api/dummydata", require("../routes/dummyDataRoutes"));
    app.use(errorHandler);
    app.use("/api/recommendations", require("../routes/userRecommendRoutes"));




    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}

main();
