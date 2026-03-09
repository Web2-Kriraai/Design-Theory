import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { name, email: rawEmail, password, role } = await req.json();
        const email = rawEmail?.toLowerCase().trim();
        const cleanName = name?.trim();

        console.log("Signup attempt for:", email);

        if (!cleanName || !email || !password) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        await connectDB();

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log("Signup failed: User already exists:", email);
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create user with dynamic role (fallback to 'user')
        const user = await User.create({
            name: cleanName,
            email,
            password: hashedPassword,
            role: role || "user",
        });

        console.log("Signup successful for:", email, "assigned role:", user.role);

        return NextResponse.json({
            message: "Account created successfully",
            user: { id: user._id, name: user.name, email: user.email },
        }, { status: 201 });

    } catch (error) {
        console.error("Signup Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
