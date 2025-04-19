import express from "express";
const router = express.Router();

import {
    getUsers,
    createUser,
    getUser,
    updateUser,
    deleteUser,
} from "../controllers/userController.js";

router.route("/").get(getUsers);

router.route("/").post(createUser);

router.route("/:id").get(getUser);

router.route("/:id").put(updateUser);

router.route("/:id").delete(deleteUser);

export default router;
