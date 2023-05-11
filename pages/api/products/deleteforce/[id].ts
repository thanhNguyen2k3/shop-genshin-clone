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

    if (method === 'DELETE') {
        return await Product.deleteOne({ _id: req.query.id }).then(() => res.redirect('/admin/products'));
    }

    if (method === 'PATCH') {
        return await Product.restore({ _id: req.query.id }).then(() => res.redirect('/admin/products'));
    }
}
