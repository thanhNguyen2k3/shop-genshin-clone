import mongoose from 'mongoose';
const mongooseDelete = require('mongoose-delete');

const OrderSchema = new mongoose.Schema(
    {
        customer: {
            type: String,
            required: true,
            maxlength: 60,
        },
        address: {
            type: String,
            required: true,
            minLength: 9,
            maxlength: 200,
        },
        phone: {
            type: Number,
            require: true,
            maxLength: 13,
        },
        email: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        total: {
            type: Number,
            required: true,
        },
        status: {
            type: Number,
            default: 0,
        },
        method: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true },
);

OrderSchema.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

export default (mongoose.models.Order as any) || mongoose.model('Order', OrderSchema);
