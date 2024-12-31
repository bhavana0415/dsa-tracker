import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Handle OPTIONS request for CORS preflight
export async function OPTIONS() {
    return NextResponse.json(null, {
        headers: {
            "Access-Control-Allow-Origin": "*", // Allow all origins; restrict as needed
            "Access-Control-Allow-Methods": "*", // Methods your API supports
            "Access-Control-Allow-Headers": "Content-Type", // Allowed headers
        },
    });
}

export async function POST(req) {
    try {
        const { email } = await req.json();

        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            return NextResponse.json(
                { error: "Invalid email address" },
                { status: 400 }
            );
        }

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: atob(process.env.EMAIL_PASS),
            },
        });

        const code = Math.floor(100000 + Math.random() * 900000);
        const mailOptions = {
            from: `DSAlgoVault <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Verification Email",
            html: `<p>Your verification code is: <strong>${code}</strong></p>
                   <p>This code is valid for 15 minutes.</p>`,
        };

        await transporter.sendMail(mailOptions);
        return NextResponse.json(
            { success: true, message: "Verification email sent successfully", code },
            { status: 200 }
        );
    } catch (error) {
        console.log("Error sending email:", error);

        return NextResponse.json(
            { success: false, message: "Failed to send verification email" },
            { status: 500 }
        );
    }
}
