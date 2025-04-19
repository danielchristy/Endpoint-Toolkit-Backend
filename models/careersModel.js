const mongoose = require("mongoose");
const { type } = require("os");

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

module.exports = mongoose.model('Careers', careersSchema);