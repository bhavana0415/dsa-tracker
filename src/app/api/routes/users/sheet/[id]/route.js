import connectMongoDB from "../../../../../../lib/mongodb";
import User from "../../../../../../../models/user";
import { NextResponse } from "next/server";

export async function GET(_, { params }) {
    const { id } = params;

    if (!id) {
        return new NextResponse("Missing required user ID", { status: 400 });
    }

    await connectMongoDB();

    try {
        const existingUser = await User.findById(id);
        if (!existingUser) {
            return new NextResponse("User not found", { status: 404 });
        }
        return NextResponse.json({ my_sheet: existingUser.my_sheet }, { status: 200 });
    } catch (error) {
        console.log("Error while fetching my sheet:", error);
        return new NextResponse("Error while fetching my sheet", { status: 500 });
    }
}

export async function PUT(request, { params }) {
    const { id } = params;
    const body = await request.json();
    const { my_sheet } = body;

    console.log(my_sheet);
    debugger;

    if (!id || !my_sheet) {
        return new NextResponse("Missing required fields: userId or my_sheet", { status: 400 });
    }

    await connectMongoDB();

    try {
        const existingUser = await User.findById(id);
        if (!existingUser) {
            return new NextResponse("User not found", { status: 404 });
        }

        console.log("my_sheet", my_sheet)
        existingUser.my_sheet = my_sheet;
        await existingUser.save();

        return NextResponse.json({ message: "Sheet uploaded successfully!" }, { status: 200 });
    } catch (error) {
        console.log("Error while updating my sheet:", error);
        return new NextResponse("Error while updating my sheet", { status: 500 });
    }
}
