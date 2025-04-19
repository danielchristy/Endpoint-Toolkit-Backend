import asyncHandler from 'express-async-handler';
import Career from '../models/careersModel.js';

//@des Get all careers
//@route GET /api/careers
//@access Public
const getCareers = asyncHandler(async (req, res) => {
    try {
        const careers = await Career.find({});
        console.log("Careers:", careers);
        res.status(200).json(careers);
    } catch (error) {
        console.error("Error getting careers:", error);
        res.status(500).json({ message: "Server error" });
    }
});

//@des Create career
//@route POST /api/careers
//@access Public
const createCareers = asyncHandler(async (req, res) => {
    console.log("The request body is", req.body);
    const { title, field, experience, skills, certifications } = req.body;
    if (!title || !field || !experience || !skills || !certifications) {
        console.log("Please enter all fields");
        res.status(400);
        throw new Error("Please enter all fields");
    }
    try {
        const career = await Career.create({
            title,
            field,
            experience,
            skills,
            certifications,
        });
        console.log("Career created:", career);
        res.status(201).json(career);
    } catch (error) {
        console.error("Error creating career:", error);
        res.status(500).json({ message: "Server error" });
    }
});

//@des Get career by ID
//@route GET /api/careers/:id
//@access Public
const getCareer = asyncHandler(async (req, res) => {
    const career = await Career.findById(req.params.id);
    if (!career) {
        res.status(404);
        throw new Error("Career not found");
    }
    res.status(200).json(career);
});

//@des Get careers by field
//@route GET /api/careers/field/:field
//@access Public
const getCareersByField = asyncHandler(async (req, res) => {
    const { field } = req.params;
    try {
        const careers = await Career.find({ field: field });
        if (careers.length === 0) {
            res.status(404).json({ message: "No careers found for the specified field" });
        } else {
            res.status(200).json(careers);
        }
    } catch (error) {
        console.error("Error fetching careers by field:", error);
        res.status(500).json({ message: "Server error" });
    }
});

//@des Update career by ID
//@route PUT /api/careers/:id
//@access Public
const updateCareer = asyncHandler(async (req, res) => {
    const career = await Career.findById(req.params.id);
    if (!career) {
        res.status(404);
        throw new Error("Career not found");
    }
    // if (career.user._id.toString() !== req.user._id) {
    //     res.status(401);
    //     throw new Error("User not authorized");
    // }

    const updateCareer = await Career.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
    );
    res.status(200).json(updateCareer);
});

//@des Delete career
//@route DELETE /api/careers
//@access Public
const deleteCareer = asyncHandler(async (req, res) => {
    const career = await Career.findByIdAndDelete(req.params.id);
    if (!career) {
        res.status(404);
        throw new Error("Career not found");
    }
    // if (career.user._id.toString() !== req.user._id) {
    //     res.status(401);
    //     throw new Error("User not authorized");
    // }
    await career.deleteOne({ _id: req.params.id });
    res.status(200).json(career);
});

export {
    getCareers,
    createCareers,
    getCareer,
    updateCareer,
    deleteCareer,
    getCareersByField,
};