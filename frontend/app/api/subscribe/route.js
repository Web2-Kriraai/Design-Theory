import Newsletter from '@/models/Newsletter';
import connectDB from '@/lib/mongodb';
import { NextResponse } from 'next/server';

// POST /api/subscribe — public newsletter subscription
export async function POST(request) {
    try {
        const { email } = await request.json();

        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return NextResponse.json(
                { message: 'Please enter a valid email address.' },
                { status: 400 }
            );
        }

        await connectDB();

        const existing = await Newsletter.findOne({ email: email.trim().toLowerCase() });
        if (existing) {
            return NextResponse.json(
                { message: 'You are already subscribed.' },
                { status: 400 }
            );
        }

        await Newsletter.create({ email: email.trim().toLowerCase() });

        return NextResponse.json(
            { message: 'Thank you for subscribing to The Design Theory.' },
            { status: 201 }
        );
    } catch (error) {
        console.error('Subscription error:', error);
        return NextResponse.json(
            { message: 'Failed to process subscription. Please try again later.' },
            { status: 500 }
        );
    }
}
