const express = require('express');
const router = express.Router();
const {
    getDummyData,
    createDummyData,
    getDummyDataById,
    updateDummyData,
    deleteDummyData,
} = require("../controllers/dummyDataController");

router.route("/").get(getDummyData);

router.route("/").post(createDummyData);

router.route("/:id").get(getDummyDataById);

router.route("/:id").put(updateDummyData);

router.route("/:id").delete(deleteDummyData);

module.exports = router;