import connectMongoDB from "../../../../lib/mongodb";
import User from "../../../../../models/user";
import Question from "../../../../../models/question";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function POST(request) {

    const { q_id, userId, ...questionData } = await request.json();

    if (!q_id || !userId) {
        return new NextResponse(`Missing required field: ${field}`, { status: 400 });
    }
    await connectMongoDB();

    let existingUser;
    try {
        existingUser = await User.findById(userId);
    } catch (error) {
        return new NextResponse("Error while fetching user", { status: 500 });
    }

    if (!existingUser) {
        return new NextResponse("User not found", { status: 404 });
    }

    let question = await Question.findOne({ q_id, user: userId });
    if (question) {
        for (const key in questionData) {
            question[key] = questionData[key];
        }

        await question.save();
        return NextResponse.json({ message: "Question updated", question });
    }

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
        return new NextResponse("Question Created", { status: 201 });
    } catch (error) {
        await session.abortTransaction();
        console.error("Transaction Error:", error);
        return new NextResponse("Error while creating question", { status: 500 });
    } finally {
        session.endSession();
    }
}
