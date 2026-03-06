import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const body = await request.json();
        const { email } = body;

        // Basic validation
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return NextResponse.json(
                { message: 'Invalid email address' },
                { status: 400 }
            );
        }

        // Mock saving the email to a database (e.g., MongoDB)
        // In a real scenario, you'd insert the user here and handle duplicates, perhaps tracking timestamps to avoid spam.
        // await db.collection('subscriptions').insertOne({ email, subscribedAt: new Date() });

        // Artificial delay to simulate network request
        await new Promise((resolve) => setTimeout(resolve, 800));

        // Return success
        return NextResponse.json(
            { message: 'Thank you for subscribing to The Design Theory.' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Subscription error:', error);
        return NextResponse.json(
            { message: 'Failed to process subscription. Please try again later.' },
            { status: 500 }
        );
    }
}
