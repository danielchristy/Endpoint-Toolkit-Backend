const express = require('express');
const router = express.Router();
const { userRecommendation } = require('../controllers/userRecommendController')
const Career = require('../models/careersModel');

router.route("/").post(userRecommendation);

module.exports = router;