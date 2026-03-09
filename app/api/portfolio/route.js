import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import connectMongo from '@/lib/mongodb';
import Portfolio from '@/models/Portfolio';

export async function POST(req) {
    try {
        await connectMongo();
        const body = await req.json();

        const project = await Portfolio.create(body);
        return NextResponse.json({ success: true, project }, { status: 201 });
    } catch (error) {
        console.error('Error creating project:', error);
        return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
    }
}

export async function GET() {
    try {
        await connectMongo();
        const projects = await Portfolio.find().sort({ createdAt: -1 });
        return NextResponse.json({ success: true, projects });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
    }
}

export async function PUT(req) {
    try {
        await connectMongo();
        const url = new URL(req.url);
        const id = url.searchParams.get('id');

        if (!id || !mongoose.isValidObjectId(id)) {
            return NextResponse.json({ error: 'Valid Project ID is required' }, { status: 400 });
        }

        const body = await req.json();
        const project = await Portfolio.findByIdAndUpdate(id, body, { new: true });

        if (!project) {
            return NextResponse.json({ error: 'Project not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, project });
    } catch (error) {
        console.error('Error updating project:', error);
        return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
    }
}

export async function DELETE(req) {
    try {
        await connectMongo();
        const url = new URL(req.url);
        const id = url.searchParams.get('id');

        if (!id || !mongoose.isValidObjectId(id)) {
            return NextResponse.json({ error: 'Valid Project ID is required' }, { status: 400 });
        }

        // Note: You might want to also delete the images from Cloudinary here
        // using the Cloudinary API if you want to save storage space.
        const project = await Portfolio.findByIdAndDelete(id);

        if (!project) {
            return NextResponse.json({ error: 'Project not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: 'Project deleted successfully' });
    } catch (error) {
        console.error('Error deleting project:', error);
        return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
    }
}
