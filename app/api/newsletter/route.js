import Newsletter from "@/models/Newsletter";
import connectDB from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectDB();
        const subscribers = await Newsletter.find().sort({ subscribedAt: -1 });
        return NextResponse.json(subscribers);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch subscribers" }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        const { email } = await req.json();
        if (!email) return NextResponse.json({ error: "Email required" }, { status: 400 });

        await connectDB();
        const existing = await Newsletter.findOne({ email });
        if (existing) return NextResponse.json({ error: "Already subscribed" }, { status: 400 });

        await Newsletter.create({ email });
        return NextResponse.json({ message: "Subscribed successfully" }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Subscription failed" }, { status: 500 });
    }
}

export async function DELETE(req) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

        await connectDB();
        await Newsletter.findByIdAndDelete(id);
        return NextResponse.json({ message: "Subscriber deleted" });
    } catch (error) {
        return NextResponse.json({ error: "Deletion failed" }, { status: 500 });
    }
}
