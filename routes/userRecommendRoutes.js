import express from "express";
const router = express.Router();
import {
    userRecommendation
} from "../controllers/userRecommendController.js";



router.route("/").post(userRecommendation);

export default router;
