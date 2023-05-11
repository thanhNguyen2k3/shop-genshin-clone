import * as request from '@/utils/request';

export const search = async (q: string) => {
    try {
        const res = await request.get(`search`, {
            params: {
                q,
            },
        });
        return res.products;
    } catch (error) {
        console.log(error);
    }
};

export const get = async () => {
    try {
        const res = await request.get('products');

        return res.products;
    } catch (error) {
        console.log(error);
    }
};
