import mongoose, {Schema} from "mongoose";

const QuestionSchema = new Schema(
    {
        topic: String,
        name: String,
        link: String,
        status: String,
        notes: String,
        difficulty: String,
        star: Boolean,
        score: Number,
    },
    {
        timestamps: true,
    }
);

const Question = mongoose.models.Question || mongoose.model('Question',QuestionSchema);

export default Question;