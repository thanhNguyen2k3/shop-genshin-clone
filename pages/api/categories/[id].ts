import { Category } from '@/models/Category';
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
        try {
            const category = await Category.findById(id);

            return res.json(category);
        } catch (error) {
            return res.status(400).json({
                message: 'Không tìm thấy loại hàng',
            });
        }
    }

    if (method === 'PUT') {
        try {
            const category = await Category.findByIdAndUpdate(id, req.body).then(() =>
                res.redirect('/admin/categories'),
            );

            return res.json(category);
        } catch (error) {
            return res.status(400).json({
                message: 'Cập nhật không thành công',
            });
        }
    }

    if (method === 'DELETE') {
        try {
            return await Category.deleteOne({ _id: req.query.id }).then(() => res.redirect('/admin/categories'));
        } catch (error) {
            return res.status(400).json({
                message: 'Xóa loại hàng thất bại',
            });
        }
    }
}
