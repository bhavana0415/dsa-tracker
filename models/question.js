import mongoose, { Schema } from "mongoose";

const QuestionSchema = new Schema(
    {
        q_id: {
            type: String,
            required: true,
        },
        status: {
            type: Boolean,
            required: false,
        },
        review: {
            type: Boolean,
            required: false,
        },
        notes: {
            type: String,
            required: false,
        },
        sheet: {
            type: String,
            required: true,
        },
        topic: {
            type: String,
            required: true,
        },
        user: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: 'User',
        },
    },
    {
        timestamps: true,
    }
);

const Question = mongoose.models.Question || mongoose.model('Question', QuestionSchema);

export default Question;
