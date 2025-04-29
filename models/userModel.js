import mongoose from "mongoose";

const certificationSchema = new mongoose.Schema({
    startDate: String,
    dueDate: String,
    title: String,
    subtitle: String,
    milestones: [String],
    completedMilestones: [String],
  }, { _id: false });

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
        certifications: [certificationSchema],
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema);
export default User;
