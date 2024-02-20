import Question from "../../../../models/question";
import { NextResponse } from "next/server";
import connectMongoDB from "../../../lib/mongodb";

export async function GET() {
    await connectMongoDB();
    const questions = await Question.find();
    return NextResponse.json({ questions });
};

// export async function POST(request) {
//     const { topic, name, link, status, notes, difficulty, star, score } = await request.json();
//     await connectMongoDB();
//     await Question.create({ topic, name, link, status, notes, difficulty, star, score });
//     return NextResponse.json({ message: "Question posted" }, { status: 200 });
// }


export async function POST(request) {
    try {
        const requestData = await request.json();

        if (Array.isArray(requestData)) {
            // If it's an array, insert multiple questions
            await connectMongoDB();
            await Question.insertMany(requestData);
            return NextResponse.json({ message: `${requestData.length} questions posted` }, { status: 200 });
        } else {
            // If it's not an array, assume a single question and insert it
            const { topic, name, link, status, notes, difficulty, star, score } = requestData;
            await connectMongoDB();
            await Question.create({ topic, name, link, status, notes, difficulty, star, score });
            return NextResponse.json({ message: "Question posted" }, { status: 200 });
        }
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}