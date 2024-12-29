import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            default: "",
        },
        password: {
            type: String,
            required: true,
            default: "",
        },
        questions: [
            {
                type: mongoose.Types.ObjectId,
                ref: 'Profile',
            },
        ],
        score: {
            type: Number,
            required: true,
            default: 0,
        }
    },
    {
        timestamps: true,
    }
);

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;
