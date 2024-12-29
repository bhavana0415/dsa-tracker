import connectMongoDB from "../../../../lib/mongodb";
import Profile from "../../../../../models/profile";
import User from '../../../../../models/user'
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function POST(request) {
    const { data, user } = await request.json();
    if (!data || !user) {
        return new NextResponse("Missing required fields", { status: 400 });
    }
    await connectMongoDB();

    let existingUser;
    try {
        existingUser = await User.findById(user);
    } catch (error) {
        return new NextResponse("Error while fetching user", { status: 500 });
    }

    if (!existingUser) {
        return new NextResponse("User not found", { status: 400 });
    }

    const createdProfile = new Profile({
        data,
        user: existingUser.id,
    })
    if (!Array.isArray(existingUser.profiles)) {
        existingUser.profiles = [];
    }

    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        await createdProfile.save({ session });
        existingUser.profiles.push(createdProfile.id);
        await existingUser.save({ session });
        await session.commitTransaction();
        session.endSession();

        return new NextResponse("Profile Created", { status: 200 });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.log(error);
        return new NextResponse("Error while creating profile", { status: 500 });
    }
}
