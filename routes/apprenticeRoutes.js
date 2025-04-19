import express from "express";
const router = express.Router();

import {
    getApprentices,
    createApprentices,
    getApprentice,
    updateApprentice,
    deleteApprentice,
} from "../controllers/apprenticeController.js";

router.route("/").get(getApprentices);

router.route("/").post(createApprentices);

router.route("/:id").get(getApprentice);

router.route("/:id").put(updateApprentice);

router.route("/:id").delete(deleteApprentice);

export default router;
