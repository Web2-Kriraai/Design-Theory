import mongoose from 'mongoose';

const PortfolioSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a title for the project'],
        maxlength: [100, 'Title cannot be more than 100 characters'],
    },
    clientName: {
        type: String,
        required: [true, 'Please provide a client name'],
    },
    category: {
        type: String,
        required: [true, 'Please provide a category'],
    },
    description: {
        type: String,
        required: [true, 'Please provide a description'],
    },
    coverImage: {
        type: String,
        required: [true, 'Please provide a cover image URL'],
    },
    images: {
        type: [String],
        validate: [arrayLimit, 'You can pass between 1 and 8 images'],
    },
    technologies: {
        type: [String],
        default: [],
    },
    projectLink: {
        type: String,
        default: '',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

function arrayLimit(val) {
    return val.length <= 8 && val.length > 0;
}

export default mongoose.models.Portfolio || mongoose.model('Portfolio', PortfolioSchema);
