import mongoose, {Schema} from "mongoose";

const ScoreSchema = new Schema(
    {
        totalScore: Number,
    },
    {
        timestamps: true,
    }
);

const Score = mongoose.models.Score || mongoose.model('Score',ScoreSchema);

export default Score;