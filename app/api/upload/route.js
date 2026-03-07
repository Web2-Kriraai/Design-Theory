import { NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';

export async function POST(req) {
    try {
        const formData = await req.formData();
        const files = formData.getAll('images');

        if (!files || files.length === 0) {
            return NextResponse.json({ error: 'No files provided' }, { status: 400 });
        }

        // Validate file size before uploading to Cloudinary (5MB limit per file on free tier)
        const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes
        for (const file of files) {
            if (file.size > MAX_FILE_SIZE) {
                return NextResponse.json({
                    error: `File ${file.name} is too large. Maximum size is 5MB per image.`
                }, { status: 400 });
            }
        }

        const uploadPromises = files.map(async (file) => {
            const arrayBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            return new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream(
                    { folder: 'design_theory_portfolio' },
                    (error, result) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(result.secure_url);
                        }
                    }
                ).end(buffer);
            });
        });

        const uploadedUrls = await Promise.all(uploadPromises);

        return NextResponse.json({ urls: uploadedUrls });
    } catch (error) {
        console.error('Error uploading images:', error);

        // Cloudinary specific file-size or parsing errors
        if (error.message && error.message.includes('File size')) {
            return NextResponse.json({ error: 'Image exceeds Cloudinary file size limit (10MB).' }, { status: 400 });
        }

        return NextResponse.json({
            error: error.message || 'Image upload failed. Please try again later.'
        }, { status: 500 });
    }
}
