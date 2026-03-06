import connectDB from '@/lib/mongodb';
import Enquiry from '@/models/Enquiry';
import { NextResponse } from 'next/server';

// PATCH /api/enquiries/[id]/status — update enquiry status (admin only)
export async function PATCH(req, { params }) {
    try {
        const { id } = params;
        const { status } = await req.json();

        const validStatuses = ['new', 'contacted', 'closed'];
        if (!validStatuses.includes(status)) {
            return NextResponse.json(
                { success: false, message: 'Invalid status. Must be: new, contacted, or closed.' },
                { status: 400 }
            );
        }

        await connectDB();
        const enquiry = await Enquiry.findByIdAndUpdate(
            id,
            { status },
            { new: true, runValidators: true }
        );

        if (!enquiry) {
            return NextResponse.json(
                { success: false, message: 'Enquiry not found.' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data: enquiry });
    } catch (error) {
        console.error('Status Update Error:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to update status.' },
            { status: 500 }
        );
    }
}
