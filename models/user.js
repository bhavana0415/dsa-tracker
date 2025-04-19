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
        avatar: {
            type: String,
            required: false,
            default: "",
        },
        questions: [
            {
                type: mongoose.Types.ObjectId,
                ref: 'Question',
            },
        ],
        my_sheet: {
            type: [Object],
            required: true,
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;
