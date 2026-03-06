import { Enquiry } from "@/models/Enquiry";
import connectDB from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        await connectDB();
        const { searchParams } = new URL(req.url);
        const email = searchParams.get("email");
        const page = parseInt(searchParams.get("page") || "1");
        const limit = 10;
        const skip = (page - 1) * limit;

        let query = {};
        if (email) {
            query.email = { $regex: email, $options: "i" };
        }

        const enquiries = await Enquiry.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const total = await Enquiry.countDocuments(query);

        return NextResponse.json({
            enquiries,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            total,
        });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch enquiries" }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        const data = await req.json();
        await connectDB();
        const enquiry = await Enquiry.create(data);
        return NextResponse.json(enquiry, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to create enquiry" }, { status: 500 });
    }
}

export async function DELETE(req) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

        await connectDB();
        await Enquiry.findByIdAndDelete(id);
        return NextResponse.json({ message: "Enquiry deleted" });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete enquiry" }, { status: 500 });
    }
}
