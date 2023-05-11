import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/utils/mongodb';
import Order from '@/models/Order';

type Data = {};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const {
        method,
        query: { id },
    } = req;

    await dbConnect();

    if (method === 'GET') {
        try {
            const order = await Order.findById(id);

            res.status(201).json(order);
        } catch (error) {
            res.status(500).json({
                message: 'Không tìm thấy khách hàng này',
            });
        }
    }

    if (method === 'PUT') {
        try {
            const order = await Order.findByIdAndUpdate(id, req.body, { new: true });

            return res.status(200).json(order);
        } catch (error) {
            return res.status(401).json({
                message: 'Không thể cập nhập trạng thái đơn hàng',
            });
        }
    }

    if (method === 'DELETE') {
        return await Order.delete({ _id: req.query.id }).then(() => res.redirect('/admin/orders'));
    }
}
