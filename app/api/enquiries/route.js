import connectDB from '@/lib/mongodb';
import Enquiry from '@/models/Enquiry';
import { NextResponse } from 'next/server';

// GET /api/enquiries — Fetch all enquiries (admin use)
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
        console.error("GET /api/enquiries error:", error);
        return NextResponse.json({ error: "Failed to fetch enquiries" }, { status: 500 });
    }
}

// POST /api/enquiries — Submit a new enquiry (public form)
export async function POST(req) {
    try {
        const body = await req.json();
        const { firstName, lastName, email, phoneNumber, projectType, message } = body;

        // ── Manual validation ────────────────────────────────────────────────
        const errors = {};

        if (!firstName || firstName.trim() === '')
            errors.firstName = 'First name is required';

        if (!lastName || lastName.trim() === '')
            errors.lastName = 'Last name is required';

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email))
            errors.email = 'Please enter a valid email address';

        const phoneRegex = /^\d{10}$/;
        if (!phoneNumber || !phoneRegex.test(phoneNumber.replace(/\s/g, '')))
            errors.phoneNumber = 'Please enter a valid 10-digit phone number';

        const validProjectTypes = [
            'residential', 'commercial', 'architecture',
            'renovation', 'visualization', 'turnkey', 'consultation',
        ];
        if (!projectType || !validProjectTypes.includes(projectType))
            errors.projectType = 'Please select a valid project type';

        if (!message || message.trim().length < 10)
            errors.message = 'Message must be at least 10 characters';

        if (Object.keys(errors).length > 0) {
            return NextResponse.json({ success: false, errors }, { status: 400 });
        }

        // ── Save to MongoDB ──────────────────────────────────────────────────
        await connectDB();
        const enquiry = await Enquiry.create({
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            email: email.trim().toLowerCase(),
            phoneNumber: phoneNumber.replace(/\s/g, ''),
            projectType,
            message: message.trim(),
        });

        return NextResponse.json(
            { success: true, message: 'Enquiry submitted successfully', enquiry },
            { status: 201 }
        );
    } catch (error) {
        console.error('POST /api/enquiries error:', error);

        if (error.name === 'ValidationError') {
            const errors = {};
            Object.keys(error.errors).forEach((key) => {
                errors[key] = error.errors[key].message;
            });
            return NextResponse.json({ success: false, errors }, { status: 400 });
        }

        return NextResponse.json(
            { success: false, message: 'An error occurred. Please try again later.' },
            { status: 500 }
        );
    }
}

// DELETE /api/enquiries — Delete an enquiry (admin use)
export async function DELETE(req) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

        await connectDB();
        await Enquiry.findByIdAndDelete(id);
        return NextResponse.json({ message: "Enquiry deleted" });
    } catch (error) {
        console.error("DELETE /api/enquiries error:", error);
        return NextResponse.json({ error: "Failed to delete enquiry" }, { status: 500 });
    }
}
