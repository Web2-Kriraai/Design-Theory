import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { name, email, password } = await req.json();

        if (!name || !email || !password) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        await connectDB();

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create user — role is "user" by default; set role to "admin" directly in MongoDB for admins
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: "user",
        });

        return NextResponse.json({
            message: "Account created successfully",
            user: { id: user._id, name: user.name, email: user.email },
        }, { status: 201 });

    } catch (error) {
        console.error("Signup Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
