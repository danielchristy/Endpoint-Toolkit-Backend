import express from "express";
const router = express.Router();

import {
    getUsers,
    createUser,
    getUser,
    updateUser,
    deleteUser,
    loginUser,
} from "../controllers/userController.js";

router.route("/").get(getUsers);

router.route("/").post(createUser);

router.route("/:id").get(getUser);

router.route("/:id").put(updateUser);

router.route("/:id").delete(deleteUser);

router.post("/login", loginUser);

export default router;
