import Order from '@/models/Order';
import dbConnect from '@/utils/mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const { method } = req;

    await dbConnect();

    if (method === 'GET') {
        const orders = await Order.findDeleted({});
        return res.status(200).json(orders);
    }
}
