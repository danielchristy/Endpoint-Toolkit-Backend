import express from "express";
const router = express.Router();
import {
    getDummyData,
    createDummyData,
    getDummyDataById,
    updateDummyData,
    deleteDummyData,
} from "../controllers/dummyDataController.js";

router.route("/").get(getDummyData);

router.route("/").post(createDummyData);

router.route("/:id").get(getDummyDataById);

router.route("/:id").put(updateDummyData);

router.route("/:id").delete(deleteDummyData);

export default router;
