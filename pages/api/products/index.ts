import { Category } from '@/models/Category';
import { Product } from '@/models/Product';
import dbConnect from '@/utils/mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const { method } = req;

    await dbConnect();

    if (method === 'GET') {
        // localhost:3000/api/products?categories=1234,5678

        let filter = {};

        if (req.query.categories) {
            filter = { category: (req.query.categories as string).split(',') };
        }

        const products = await Product.find(filter).populate('category');
        return res.status(200).json(products);
    }

    if (method === 'POST') {
        try {
            const category = Category.findById(req.body.category);
            if (!category) {
                return res.status(400).json({
                    message: 'invalid category',
                });
            }

            const product = await Product.create(req.body).then(() => res.redirect('/admin/products'));
            return res.status(200).json(product);
        } catch (error) {
            return res.status(400).json({
                message: 'Thêm sản phẩm không thành công',
            });
        }
    }
}
