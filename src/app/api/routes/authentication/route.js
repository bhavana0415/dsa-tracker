import connectMongoDB from "../../../../lib/mongodb";
import User from "../../../../../models/user"
import { NextResponse } from "next/server";

export async function POST(request) {
    const { email } = await request.json();
    await connectMongoDB();
    const user = await User.findOne({ email });

    if (user) {
        return NextResponse.json({ exists: true });
    } else {
        return NextResponse.json({ exists: false });
    }
}
