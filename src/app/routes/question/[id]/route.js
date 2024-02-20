import Question from "../../../../../models/question";
import { NextResponse } from "next/server";
import connectMongoDB from "../../../../lib/mongodb";

export async function PUT(request, { params }) {
    const { id } = params;
    const { status: status, notes: notes } = await request.json();
    await connectMongoDB();
    await Question.findByIdAndUpdate(id, { status, notes });
    return NextResponse.json({ message: "Question updated" }, { status: 200 });
}