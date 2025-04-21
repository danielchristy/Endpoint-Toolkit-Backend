import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//@des Get all users
//@route GET /api/users
//@access Public
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({}).select("-password");
    res.status(200).json(users);
});

//@des Get user by ID
//@route GET /api/users/:id
//@access Public
const getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }
    res.status(200).json(user);
});

//@des Create user
//@route POST /api/users
//@access Public
const createUser = asyncHandler(async (req, res) => {
    // console.log("The request body is", req.body);
    const { first_name, last_name, username, email, password } = req.body;
    if (!first_name || !last_name || !username || !email || !password) {
        res.status(400);
        throw new Error("Please enter all fields");
    }
    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
        res.status(400);
        throw new Error("User already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        first_name,
        last_name,
        username,
        email,
        password: hashedPassword,
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            username: user.username,
            email: user.email,
        });
    } else {
        res.status(400);
        console.error("User data is not valid");
    }
    res.json({ message: "User created" });
});

//@desc Login user
//@route POST /api/users/login
//@access Public
const loginUser = asyncHandler(async (req, res) => {
    console.log("Login request received:", req.body);

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "30d",
        });
        console.log("Token generated:", token);

        res.status(200).json({
            _id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            username: user.username,
            email: user.email,
            token,
        });
    } else {
        console.log("Invalid email or password");
        res.status(401);
        throw new Error("Invalid email or password");
    }
});

//@des Update user by ID
//@route PUT /api/users/:id
//@access Public
const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }
    const { first_name, last_name, username, email, password } = req.body;
    if (first_name) user.first_name = first_name;
    if (last_name) user.last_name = last_name;
    if (username) user.username = username;
    if (email) user.email = email;
    if (password) user.password = password;

    const updatedUser = await user.save();
    res.status(200).json({
        _id: updatedUser._id,
        first_name: updatedUser.first_name,
        last_name: updatedUser.last_name,
        username: updatedUser.username,
        email: updatedUser.email,
    });
});

//@des Delete user by ID
//@route DELETE /api/users/:id
//@access Public
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }
    await user.remove();
    res.status(200).json({ message: "User removed" });
});

export {
    getUsers,
    getUser,
    createUser,
    loginUser,
    updateUser,
    deleteUser
};
