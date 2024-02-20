import Score from "../../../../models/score";
import { NextResponse } from "next/server";
import connectMongoDB from "../../../lib/mongodb";

export async function GET() {
    await connectMongoDB();
    const score = await Score.find();
    return NextResponse.json({ score });
};

export async function POST(request) {
    const { totalScore } = await request.json();
    await connectMongoDB();
    await Score.create({ totalScore });
    return NextResponse.json({ message: "Score posted" }, { status: 200 });
}