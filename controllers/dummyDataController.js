import asyncHandler from "express-async-handler";
import DummyData from "../models/dummyDataModel.js";


//@des Get all dummy data
//@route GET /api/dummydata
//@access Public
const getDummyData = asyncHandler(async (req, res) => {
    try {
        const dummyData = await DummyData.find({});
        console.log("Dummy data:", dummyData);
        res.status(200).json(dummyData);
    } catch (error) {
        console.error("Error getting dummy data:", error);
        res.status(500).json({ message: "Server error" });
    }
});

//@des Create dummy data
//@route POST /api/dummydata
//@access Public
const createDummyData = asyncHandler(async (req, res) => {
    console.log("The request body is", req.body);
    const { jobTitle, jobCode, description, wageInformation, location, skills, educationOptions, trainingPrograms, toolsAndTechnology } = req.body;
    if (!jobTitle || !jobCode || !description || !wageInformation || !location || !skills || !educationOptions || !trainingPrograms || !toolsAndTechnology) {
        res.status(400);
        throw new Error("Please enter all fields");
    }
    try {
        const dummyData = await DummyData.create({
            jobTitle,
            jobCode,
            description,
            wageInformation,
            location,
            skills,
            educationOptions,
            trainingPrograms,
            toolsAndTechnology,
        });
        console.log("Dummy data created:", dummyData);
        res.status(201).json(dummyData);
    } catch (error) {
        console.error("Error creating dummy data:", error);
        res.status(500).json({ message: "Server error" });
    }
});

//@des Get dummy data by ID
//@route GET /api/dummydata/:id
//@access Public
const getDummyDataById = asyncHandler(async (req, res) => {
    const dummyData = await DummyData.findById(req.params.id);
    if (!dummyData) {
        res.status(404);
        throw new Error("Dummy data not found");
    }
    res.status(200).json(dummyData);
});

//@des Update dummy data by ID
//@route PUT /api/dummydata/:id
//@access Public
const updateDummyData = asyncHandler(async (req, res) => {
    const dummyData = await DummyData.findById(req.params.id);
    if (!dummyData) {
        res.status(404);
        throw new Error("Dummy data not found");
    }
    const updateDummyData = await DummyData.findByIdAndUpdate(req
        .params.id, req.body, {
        new: true,
        runValidators: true,
    });
    res.status(200).json(updateDummyData);
});

//@des Delete dummy data by ID
//@route DELETE /api/dummydata/:id
//@access Public
const deleteDummyData = asyncHandler(async (req, res) => {
    const dummyData = await DummyData.findById(req.params.id);
    if (!dummyData) {
        res.status(404);
        throw new Error("Dummy data not found");
    }
    await dummyData.deleteOne({ _id: req.params.id });
    res.status(200).json(dummyData);
});

export {
    getDummyData,
    createDummyData,
    getDummyDataById,
    updateDummyData,
    deleteDummyData,
};