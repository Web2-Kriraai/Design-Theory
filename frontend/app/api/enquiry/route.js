import connectDB from '@/lib/mongodb';
import Enquiry from '@/models/Enquiry';
import { NextResponse } from 'next/server';

// POST /api/enquiry — public contact form submission
export async function POST(req) {
    try {
        const { firstName, lastName, email, phoneNumber, projectType, message } = await req.json();

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
            { success: true, message: 'Enquiry submitted successfully', id: enquiry._id },
            { status: 201 }
        );
    } catch (error) {
        // Mongoose validation errors
        if (error.name === 'ValidationError') {
            const errors = {};
            Object.keys(error.errors).forEach((key) => {
                errors[key] = error.errors[key].message;
            });
            return NextResponse.json({ success: false, errors }, { status: 400 });
        }

        console.error('Enquiry Submission Error:', error);
        return NextResponse.json(
            { success: false, message: 'An error occurred. Please try again later.' },
            { status: 500 }
        );
    }
}
