import dbConnect from '@/utils/mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Product } from '@/models/Product';

type Data = {};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const { method } = req;
    await dbConnect();

    if (method === 'GET') {
        try {
            const { q: query } = req.query;

            const products = await Product.find({
                $or: [
                    { name: { $regex: query } },
                    { slug: { $regex: query } },
                    { shortDescription: { $regex: query } },
                    // { description: { $regex: query } },
                ],
            });

            return res.status(200).json({ products });
        } catch (error) {
            return res.status(500).json({
                message: 'invalid query',
            });
        }
    }
}
