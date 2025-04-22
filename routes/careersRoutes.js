import express from "express";
const router = express.Router();
import {
    getCareers,
    createCareers,
    getCareer,
    getCareersByField,
    updateCareer,
    deleteCareer,
} from "../controllers/careersController.js";

router.route("/").get(getCareers);

router.route("/").post(createCareers);

router.route("/:id").get(getCareer);

router.route("/:id").put(updateCareer);

router.route("/:id").delete(deleteCareer);

router.route("/field/:field").get(getCareersByField);

export default router;
