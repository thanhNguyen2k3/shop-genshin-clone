import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        colors: [
            {
                type: String,
                required: true,
            },
        ],
        sizes: [
            {
                type: String,
                required: true,
            },
        ],
    },
    {
        timestamps: true,
    },
);

export const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);
