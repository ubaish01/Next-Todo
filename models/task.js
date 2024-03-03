import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    isCompleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });


mongoose.models = {};

export const Task = mongoose.model("Task", schema)