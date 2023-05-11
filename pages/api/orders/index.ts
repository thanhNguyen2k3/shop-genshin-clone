import dbConnect from '@/utils/mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import Order from '@/models/Order';
import { useSession } from 'next-auth/react';

type Data = {};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const { method } = req;

    await dbConnect();

    if (method === 'GET') {
        try {
            const orders = await Order.find();

            return res.status(200).json(orders);
        } catch (error) {
            return res.status(400).json({
                message: 'Không tìm thấy khách hàng',
            });
        }
    }

    if (method === 'POST') {
        try {
            const order = await Order.create(req.body);
            return res.status(200).json(order);
        } catch (error) {
            return res.status(400).json({
                message: 'Không thể thêm khách hàng',
            });
        }
    }
}
