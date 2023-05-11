import { Product } from '@/models/Product';
import dbConnect from '@/utils/mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const { method } = req;

    await dbConnect();

    if (method === 'GET') {
        const products = await Product.findDeleted({});
        return res.status(200).json(products);
    }
}
