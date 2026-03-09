import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";
import crypto from "crypto";
import sendEmail from "@/lib/sendEmail";

export async function POST(req) {
    try {
        const { email } = await req.json();
        console.log("Password reset requested for:", email);

        if (!email) {
            return NextResponse.json({ error: "Please provide an email" }, { status: 400 });
        }

        await connectDB();

        // 1. Find user by email
        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json({ error: "There is no user with that email" }, { status: 404 });
        }

        // 2. Generate 6-digit OTP
        const resetToken = crypto.randomInt(100000, 999999).toString();

        // 3. Hash token and set to resetPasswordToken field
        const resetPasswordToken = crypto
            .createHash("sha256")
            .update(resetToken)
            .digest("hex");

        // 4. Set token expire time (10 minutes)
        const resetPasswordExpire = Date.now() + 10 * 60 * 1000;

        // 5. Save to database (use findByIdAndUpdate to bypass required field validation if any)
        await User.findByIdAndUpdate(user._id, {
            resetPasswordToken,
            resetPasswordExpire
        }, { new: true, runValidators: false });

        // 6. HTML Message
        const message = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
                <h2 style="color: #2D2926;">Password Reset Request</h2>
                <p>You are receiving this email because you (or someone else) requested a password reset for your account.</p>
                <p>Your One-Time Password (OTP) is:</p>
                <div style="background-color: #F9F7F2; padding: 20px; text-align: center; border-radius: 8px; margin: 24px 0;">
                    <h1 style="font-size: 40px; letter-spacing: 8px; color: #31275c; margin: 0;">${resetToken}</h1>
                </div>
                <p>This code will expire in 10 minutes.</p>
                <p style="color: #999; font-size: 12px; margin-top: 40px;">If you did not request this, please ignore this email and your password will remain unchanged.</p>
            </div>
        `;

        try {
            await sendEmail({
                email: user.email,
                subject: "The Design Theory - Password Reset",
                html: message,
            });

            return NextResponse.json({ message: "Email sent successfully" }, { status: 200 });
        } catch (error) {
            console.error("Email Error:", error);

            // Revert changes if email fails
            await User.findByIdAndUpdate(user._id, {
                resetPasswordToken: undefined,
                resetPasswordExpire: undefined
            }, { new: true, runValidators: false });

            return NextResponse.json({ error: "Email could not be sent" }, { status: 500 });
        }

    } catch (error) {
        console.error("Forgot Password Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
