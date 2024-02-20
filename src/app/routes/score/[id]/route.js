import Score from "../../../../../models/score";
import { NextResponse } from "next/server";
import connectMongoDB from "../../../../lib/mongodb";

export async function PUT(request, { params }) {
    const { id } = params;
    const { totalScore: totalScore } = await request.json();
    await connectMongoDB();
    await Score.findByIdAndUpdate(id, { totalScore });
    return NextResponse.json({ message: "Score updated" }, { status: 200 });
}