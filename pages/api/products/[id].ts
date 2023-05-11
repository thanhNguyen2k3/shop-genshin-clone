import { Product } from '@/models/Product';
import dbConnect from '@/utils/mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const {
        method,
        query: { id },
    } = req;

    await dbConnect();

    if (method === 'GET') {
        const products = await Product.findById({ _id: req.query.id }).populate('category');
        return res.status(200).json(products);
    }

    if (method === 'PUT') {
        const product = await Product.findByIdAndUpdate({ _id: req.query.id }, req.body).then(() =>
            res.redirect('/admin/products'),
        );
        return res.status(200).json(product);
    }

    if (method === 'DELETE') {
        return await Product.delete({ _id: req.query.id }).then(() => res.redirect('/admin/products'));
    }
}
