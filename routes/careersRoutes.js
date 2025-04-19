const express = require('express');
const router = express.Router();
const {
    getCareers,
    createCareers,
    getCareer,
    updateCareer,
    deleteCareer,
    getCareersByField,
} = require("../controllers/careersController");

router.route("/").get(getCareers);

router.route("/").post(createCareers);

router.route("/:id").get(getCareer);

router.route("/:id").put(updateCareer);

router.route("/:id").delete(deleteCareer);

router.route("/field/:field").get(getCareersByField);

module.exports = router;