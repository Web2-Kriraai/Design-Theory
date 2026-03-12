import { NextResponse } from 'next/server';
import connectMongo from '@/lib/mongodb';
import Career from '@/models/Career';

// POST — Submit a new job application
export async function POST(req) {
    try {
        await connectMongo();
        const body = await req.json();
        const { name, email, contact, designation, message, attachmentUrl } = body;

        if (!name || !email || !contact || !designation) {
            return NextResponse.json(
                { error: 'Name, email, contact, and designation are required.' },
                { status: 400 }
            );
        }

        const application = await Career.create({
            name,
            email,
            contact,
            designation,
            message: message || '',
            attachmentUrl: attachmentUrl || '',
        });

        return NextResponse.json(
            { success: true, application },
            { status: 201 }
        );
    } catch (error) {
        console.error('Career POST error:', error);
        return NextResponse.json(
            { error: error.message || 'Submission failed.' },
            { status: 500 }
        );
    }
}

// GET — Retrieve all applications (admin only, protected by middleware)
export async function GET() {
    try {
        await connectMongo();
        const applications = await Career.find().sort({ createdAt: -1 });
        return NextResponse.json({ applications });
    } catch (error) {
        console.error('Career GET error:', error);
        return NextResponse.json({ error: 'Failed to fetch applications.' }, { status: 500 });
    }
}

// DELETE — Remove a job application
export async function DELETE(req) {
    try {
        await connectMongo();
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'ID is required to delete.' }, { status: 400 });
        }

        const deletedApplication = await Career.findByIdAndDelete(id);

        if (!deletedApplication) {
            return NextResponse.json({ error: 'Application not found.' }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: 'Application deleted successfully.' });
    } catch (error) {
        console.error('Career DELETE error:', error);
        return NextResponse.json({ error: 'Failed to delete application.' }, { status: 500 });
    }
}
