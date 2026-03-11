import mongoose from 'mongoose';

const CareerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true,
            maxlength: [100, 'Name cannot exceed 100 characters'],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            trim: true,
            lowercase: true,
            match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email'],
        },
        contact: {
            type: String,
            required: [true, 'Contact number is required'],
            trim: true,
        },
        designation: {
            type: String,
            required: [true, 'Designation / Role applied for is required'],
            trim: true,
        },
        message: {
            type: String,
            trim: true,
            maxlength: [2000, 'Message cannot exceed 2000 characters'],
            default: '',
        },
        attachmentUrl: {
            type: String,
            default: '',
        },
        status: {
            type: String,
            enum: ['new', 'reviewing', 'shortlisted', 'rejected'],
            default: 'new',
        },
    },
    { timestamps: true }
);

const Career = mongoose.models.Career || mongoose.model('Career', CareerSchema);
export default Career;
