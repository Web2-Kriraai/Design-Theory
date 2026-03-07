import mongoose from 'mongoose';

const NewsletterSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    subscribedAt: {
        type: Date,
        default: Date.now,
    },
});

const Newsletter = mongoose.models.Newsletter || mongoose.model('Newsletter', NewsletterSchema);
export { Newsletter };
export default Newsletter;
