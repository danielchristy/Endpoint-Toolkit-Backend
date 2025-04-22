import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        first_name: {
            type: String,
            required: true,
        },
        last_name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+\@.+\..+/, 'Please provide a valid email address'],
        },
        password: {
            type: String,
            required: true,
        },
        skills: {
            type: [String],
            default: [],
        },
        certifications: {
            type: [String],
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema);
export default User;
