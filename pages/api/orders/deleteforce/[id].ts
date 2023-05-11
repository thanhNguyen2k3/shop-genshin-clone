import Order from '@/models/Order';
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
        return await Order.deleteOne({ _id: req.query.id }).then(() => res.redirect('/admin/orders'));
    }

    if (method === 'PATCH') {
        return await Order.restore({ _id: req.query.id }).then(() => res.redirect('/admin/orders'));
    }
}
