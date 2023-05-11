import { Category } from '@/models/Category';
import dbConnect from '@/utils/mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const { method } = req;

    await dbConnect();

    if (method === 'GET') {
        try {
            const categories = await Category.find();

            return res.json(categories);
        } catch (error) {
            return res.status(400).json({
                message: 'Không tìm thấy loại hàng',
            });
        }
    }

    if (method === 'POST') {
        try {
            const CategoryDoc = await Category.create(req.body).then(() => res.redirect('/admin/categories'));

            return res.json(CategoryDoc);
        } catch (error) {
            return res.status(400).json({
                message: 'Thêm loại hàng không thành công',
            });
        }
    }
}
