import connectMongoDB from "../../../../../lib/mongodb";
import User from "../../../../../../models/user";
import { NextResponse } from "next/server";
import Question from "../../../../../../models/question";
import { NextRequest } from "next/server";

export async function GET(_, { params }) {
    const { id } = params;

    if (!id) {
        return new NextResponse("Missing required user ID", { status: 400 });
    }

    await connectMongoDB();

    try {
        const existingUser = await User.findById(id).populate("questions").exec();
        if (!existingUser) {
            return new NextResponse("User not found", { status: 404 });
        }
        return NextResponse.json(existingUser.questions, { status: 200 });
    } catch (error) {
        console.error("Error while fetching questions:", error);
        return new NextResponse("Error while fetching questions", { status: 500 });
    }
}

export async function POST(request, { params }) {
    const { id } = params;
    const body = await request.json();
    const { sheet } = body;

    if (!id || !sheet) {
        return new NextResponse("Missing required fields: userId or sheet", { status: 400 });
    }

    await connectMongoDB();

    try {
        const questions = await Question.find({ user: id, sheet }).exec();
        return NextResponse.json(questions, { status: 200 });
    } catch (error) {
        console.error("Error while fetching questions:", error);
        return new NextResponse("Error while fetching questions", { status: 500 });
    }
}

export async function PUT(request, { params }) {
    const { id } = params;
    const body = await request.json();
    const { sheet, topic } = body;

    if (!id || !sheet || !topic) {
        return new NextResponse("Missing required fields: userId, sheet, or topic", { status: 400 });
    }

    await connectMongoDB();

    try {
        const questions = await Question.find({ user: id, sheet, topic }).exec();
        return NextResponse.json(questions, { status: 200 });
    } catch (error) {
        console.error("Error while fetching questions:", error);
        return new NextResponse("Error while fetching questions", { status: 500 });
    }
}
