import connectMongoDB from "../../../../lib/mongodb";
import User from "../../../../../models/user";
import Question from "../../../../../models/question";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function POST(request) {
    const { q_id, userId, ...questionData } = await request.json();

    // Validate required fields
    if (!q_id || !userId) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await connectMongoDB();

    // Check if user exists
    let existingUser;
    try {
        existingUser = await User.findById(userId);
    } catch (error) {
        console.error("Error while fetching user:", error);
        return NextResponse.json({ error: "Error while fetching user" }, { status: 500 });
    }

    if (!existingUser) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    let question;
    try {
        // Check if question exists
        question = await Question.findOne({ q_id, user: userId });
        if (question) {
            // Update existing question
            for (const key in questionData) {
                question[key] = questionData[key];
            }
            await question.save();
            return NextResponse.json({ message: "Question updated", question });
        }

        // Create new question
        question = new Question({
            q_id,
            ...questionData,
            user: userId,
        });

        if (!Array.isArray(existingUser.questions)) {
            existingUser.questions = [];
        }

        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            await question.save({ session });
            existingUser.questions.push(question.id);
            await existingUser.save({ session });
            await session.commitTransaction();
            session.endSession();
            return NextResponse.json({ message: "Question created", question });
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            console.error("Transaction Error:", error);
            return NextResponse.json({ error: JSON.stringify(error) }, { status: 500 });
        }
    } catch (error) {
        console.error("Unexpected Error:", error);
        return NextResponse.json({ error: "Unexpected error occurred" }, { status: 500 });
    }
}
