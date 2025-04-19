import mongoose from "mongoose";
import os from "os";

const careersSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        field: {
            type: String,
            required: true,
        },
        experience: {
            type: String,
            required: true,
        },
        skills: {
            type: [String],
            required: true,
        },
        certifications: {
            type: [String],
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

const Career = mongoose.model("Career", careersSchema);
export default Career;
