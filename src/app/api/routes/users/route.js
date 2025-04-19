import connectMongoDB from "../../../../lib/mongodb";
import User from "../../../../../models/user"
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function GET() {
    await connectMongoDB();
    const users = await User.find();
    return NextResponse.json({ users });
}

export async function POST(request) {
    const { email, password, questions, avatar } = await request.json();
    if (!email || !password) {
        return new NextResponse("Missing required fields", { status: 400 });
    }
    await connectMongoDB();

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            email,
            avatar,
            password: hashedPassword,
            questions,
            my_sheet: [],
        });
        await newUser.save();

        console.log("New User Data:", newUser);

        return new NextResponse("User Registered", { status: 200 });
    } catch (error) {
        console.log("Error registering user:", error);

        return new NextResponse("Internal Server Error", { status: 500 });
    }
}