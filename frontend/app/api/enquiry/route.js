import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function POST(request) {
    try {
        const body = await request.json();
        const { firstName, lastName, email, phoneNumber, projectType, message } = body;

        // 1. Validation
        const errors = {};

        if (!firstName || firstName.trim() === '') {
            errors.firstName = "First name is required";
        }
        if (!lastName || lastName.trim() === '') {
            errors.lastName = "Last name is required";
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            errors.email = "Please enter a valid email address";
        }

        // Phone number validation (10 digits)
        const phoneRegex = /^\d{10}$/;
        if (!phoneNumber || !phoneRegex.test(phoneNumber.replace(/\s/g, ''))) {
            errors.phoneNumber = "Please enter a valid 10-digit phone number";
        }

        if (!projectType || projectType === '') {
            errors.projectType = "Please select a project type";
        }

        if (!message || message.trim().length < 10) {
            errors.message = "Message must be at least 10 characters long";
        }

        if (Object.keys(errors).length > 0) {
            return NextResponse.json({ success: false, errors }, { status: 400 });
        }

        // 2. Database Insert
        const client = await clientPromise;
        const db = client.db("The_design_Theory");
        const collection = db.collection("enquiry");

        const result = await collection.insertOne({
            firstName,
            lastName,
            email,
            phoneNumber,
            projectType,
            message,
            createdAt: new Date(),
        });

        return NextResponse.json({
            success: true,
            message: "Enquiry submitted successfully",
            id: result.insertedId
        }, { status: 201 });

    } catch (error) {
        console.error("MongoDB Error:", error);
        return NextResponse.json({
            success: false,
            message: "An error occurred while submitting your enquiry. Please try again later."
        }, { status: 500 });
    }
}
