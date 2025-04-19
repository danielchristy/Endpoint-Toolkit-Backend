import asyncHandler from 'express-async-handler';
import Apprentice from '../models/apprenticeModel.js';

//@des Get all apprentices
//@route GET /api/apprentices
//@access Public
const getApprentices = asyncHandler(async (req, res) => {
    try {
        const apprentices = await Apprentice.find({});
        console.log("Apprenticeships:", apprentices)
        res.status(200).json(apprentices);
    } catch (error) {
        console.error("Error getting apprentices:", error);
        res.status(500).json({ message: "Server error" });
    }
});

//@des Create apprentice
//@route POST /api/apprentices
//@access Public
const createApprentices = asyncHandler(async (req, res) => {
    console.log("The request body is", req.body);
    const { apprentice_title, location } = req.body;
    if (!apprentice_title || !location) {
        res.status(400);
        throw new Error("Please enter all fields");
    }
    try {
        const apprentice = await Apprentice.create({
            apprentice_title,
            location,
        });
        console.log("Apprentice created:", apprentice);
        res.status(201).json(apprentice);
    } catch (error) {
        console.error("Error creating apprentice:", error);
        res.status(500).json({ message: "Server error" });
    }
});

//@des Get apprentice by ID
//@route GET /api/apprentices/:id
//@access Public
const getApprentice = asyncHandler(async (req, res) => {
    const apprentice = await Apprentice.findById(req.params.id);
    if (!apprentice) {
        res.status(404);
        throw new Error("Apprentice not found");
    }
    res.status(200).json(apprentice);
});

//@des Update apprentice by ID
//@route PUT /api/apprentices/:id
//@access Public
const updateApprentice = asyncHandler(async (req, res) => {
    const apprentice = await Apprentice.findById(req.params.id);
    if (!apprentice) {
        res.status(404);
        throw new Error("Apprentice not found");
    }
    // if (apprentice.user._id.toString() !== req.user._id) {
    //     res.status(401);
    //     throw new Error("User not authorized");
    // }
    const updateApprentice = await Apprentice.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
    )
    res.status(200).json(apprentice);
});

//@des Delete apprentice
//@route DELETE /api/apprentices
//@access Public
const deleteApprentice = asyncHandler(async (req, res) => {
    const apprentice = await Apprentice.findById(req.params.id);
    if (!apprentice) {
        res.status(404);
        throw new Error("Apprentice not found");
    }
    // if (apprentice.user._id.toString() !== req.user._id) {
    //     res.status(401);
    //     throw new Error("User not authorized");
    // }
    await apprentice.deleteOne({ _id: req.params.id });
    res.status(200).json(apprentice);
});



export {
    getApprentices,
    createApprentices,
    getApprentice,
    updateApprentice,
    deleteApprentice,
};