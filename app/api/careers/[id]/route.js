import { NextResponse } from 'next/server';
import connectMongo from '@/lib/mongodb';
import Career from '@/models/Career';

// PATCH — Update the status of a single application
export async function PATCH(req, { params }) {
    try {
        await connectMongo();
        const { id } = params;
        const { status } = await req.json();

        const validStatuses = ['new', 'reviewing', 'shortlisted', 'rejected'];
        if (!validStatuses.includes(status)) {
            return NextResponse.json({ error: 'Invalid status value.' }, { status: 400 });
        }

        const updated = await Career.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!updated) {
            return NextResponse.json({ error: 'Application not found.' }, { status: 404 });
        }

        return NextResponse.json({ success: true, application: updated });
    } catch (error) {
        console.error('Career PATCH error:', error);
        return NextResponse.json({ error: 'Update failed.' }, { status: 500 });
    }
}
