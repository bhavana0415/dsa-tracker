import connectMongoDB from "../../../../../lib/mongodb";
import Profile from "../../../../../../models/profile";
import User from '../../../../../../models/user'
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET(request, { params }) {
    const { id } = params;
    await connectMongoDB();

    try {
        const profile = await Profile.findById(id);
        if (!profile) {
            return new NextResponse("Profile not found", { status: 400 });
        }
        return new NextResponse(JSON.stringify(profile), { status: 200 });
    } catch (error) {
        return new NextResponse("Error while fetching profile", { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    const { id } = params;
    if (!id) {
        return new NextResponse("Missing required fields", { status: 400 });
    }

    await connectMongoDB();

    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const profile = await Profile.findById(id);
        if (!profile) {
            return new NextResponse("Profile not found", { status: 400 });
        }

        const user = await User.findById(profile.user);
        if (!user) {
            return new NextResponse("User not found", { status: 400 });
        }

        user.profiles.pull(id);
        await user.save({ session });
        await Profile.findByIdAndDelete(id, { session });
        await session.commitTransaction();
        session.endSession();
        return new NextResponse("Profile deleted successfully", { status: 200 });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        return new NextResponse("Error while deleting profile", { status: 500 });
    }
}

export async function PATCH(request, { params }) {
    const { id } = await params;
    const { data } = await request.json();
    if (!id || !data) {
        return new NextResponse("Missing required fields", { status: 400 });
    }

    await connectMongoDB();

    try {
        const updatedProfile = await Profile.findByIdAndUpdate(id, { data }, { new: true });
        if (!updatedProfile) {
            return new NextResponse("Profile not found", { status: 400 });
        }
        return new NextResponse(JSON.stringify(updatedProfile), { status: 200 });
    } catch (error) {
        return new NextResponse("Error while updating profile", { status: 500 });
    }
}
