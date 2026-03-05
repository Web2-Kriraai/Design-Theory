import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const body = await request.json();

        // Relay the request to the Express backend running on port 5000
        const backendUrl = process.env.BACKEND_URL || "http://localhost:5000";

        const response = await fetch(`${backendUrl}/api/enquiry`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        const data = await response.json();

        if (response.ok) {
            return NextResponse.json(data, { status: 201 });
        } else {
            return NextResponse.json(data, { status: response.status });
        }

    } catch (error) {
        console.error("API Proxy Error:", error);
        return NextResponse.json({
            success: false,
            message: "An error occurred while communicating with the backend server. Please try again later."
        }, { status: 500 });
    }
}
