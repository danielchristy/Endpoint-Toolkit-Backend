const express = require('express');
const router = express.Router();
const {
    getApprentices,
    createApprentices,
    getApprentice,
    updateApprentice,
    deleteApprentice,
} = require("../controllers/apprenticeController");

router.route("/").get(getApprentices);

router.route("/").post(createApprentices);

router.route("/:id").get(getApprentice);

router.route("/:id").put(updateApprentice);

router.route("/:id").delete(deleteApprentice);

module.exports = router;