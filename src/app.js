// import dotenv from "dotenv";
// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";

// import errorHandler from "../middleware/errorHandler.js";
// import userRoutes from "../routes/userRoutes.js";
// import careerRoutes from "../routes/careersRoutes.js";
// import userRecommendRoutes from "../routes/userRecommendRoutes.js";


// dotenv.config();

// const MONGO = process.env.MONGO_URI;

// const allowedOrigins = [
//     'https://devwaypoint.xyz',
//     'http://localhost:3000',
// ];

// const main = async () => {
//     const app = express();
//     try {
//         await mongoose.connect(MONGO);
//     } catch (error) {
//         console.error("Error connecting to database:", error);
//         process.exit(1);
//     }

//     app.use(express.json());
//     app.use(cors({
//         origin: allowedOrigins
//     }));
//     app.use("/api/users", userRoutes);
//     app.use("/api/careers", careerRoutes);
//     app.use("/api/recommendations", userRecommendRoutes);
//     app.use(errorHandler);

//     app.listen(port, () => {
//         console.log(`Server is running on port ${port}`);
//     });
// };

// main();
