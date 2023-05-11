import mongoose from 'mongoose';
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const ProductShema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        shortDescription: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        images: {
            type: Array,
            required: true,
        },
        category: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: 'Category',
        },
        cost: {
            type: Number,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        slug: {
            type: String,
            slug: 'name',
        },
    },
    {
        timestamps: true,
    },
);

// add plugin
mongoose.plugin(slug);
ProductShema.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

export const Product: any = mongoose.models.Product || mongoose.model('Product', ProductShema);
