import connectDB from "@/lib/mongodb";
import Enquiry from "@/models/Enquiry";
import Newsletter from "@/models/Newsletter";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== "admin") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await connectDB();

        const [totalEnquiries, totalSubscribers, latestEnquiry] = await Promise.all([
            Enquiry.countDocuments(),
            Newsletter.countDocuments(),
            Enquiry.findOne().sort({ createdAt: -1 }).lean(),
        ]);

        return NextResponse.json({
            stats: {
                totalEnquiries,
                totalSubscribers,
            },
            latestEnquiry,
        });
    } catch (error) {
        console.error("Dashboard Stats Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
