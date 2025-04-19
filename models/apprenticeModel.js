const mongoose = require("mongoose");

const apprenticeSchema = mongoose.Schema(
    {
        // career_id: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     required: true,
        //     ref: 'User',
        // },
        apprentice_title: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Apprentices', apprenticeSchema);