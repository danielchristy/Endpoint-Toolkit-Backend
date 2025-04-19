import asyncHandler from 'express-async-handler';
import Career from '../models/careersModel.js';
import { calculateScore } from '../userRecommendation/userRecommendationCalculations.js';

//@des Post user recommendations
//@route POST /api/recommendations
//@access Public
const userRecommendation = asyncHandler(async (req, res) => {
    try {
        const userPreferences = {
            ...req.body,
            field: Array.isArray(req.body.field) ? req.body.field : [req.body.field],
            skills: Array.isArray(req.body.skills) ? req.body.skills : [req.body.skills],
            certifications: Array.isArray(req.body.certifications) ? req.body.certifications : [req.body.certifications],
        }
        const careers = await Career.find();
        const scoredCareers = careers.map(career => ({
            ...career.toObject(),
            score: Number(calculateScore(career, userPreferences)),
        }));

        const validCareers = scoredCareers.filter(career => !isNaN(career.score));

        validCareers.sort((a, b) => b.score - a.score);

        res.json(validCareers.slice(0, 3));
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

export {
    userRecommendation
};
