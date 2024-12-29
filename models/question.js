import mongoose, { Schema } from "mongoose";

const QuestionSchema = new Schema(
    {
        data: {
            type: Object,
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
