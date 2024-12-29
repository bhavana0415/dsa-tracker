import connectMongoDB from "../../../../../lib/mongodb";
import User from "../../../../../../models/user";
import Profile from '../../../../../../models/profile';
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    const { id } = await params;  // Await the params here
    if (!id) {
        return new NextResponse("Missing required user ID", { status: 400 });
    }

    await connectMongoDB();

    try {
        const existingUser = await User.findById(id).populate("profiles").exec();
        if (!existingUser) {
            return new NextResponse("User not found", { status: 400 });
        }
        return new NextResponse(JSON.stringify(existingUser.profiles), { status: 200 });
    } catch (error) {
        console.log(error)
        return new NextResponse("Error while fetching profiles", { status: 500 });
    }
}
