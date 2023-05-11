import Layout from '@/components/Layout/Layout';
import Trash from '@/components/Trash';
import { IOrder, IProduct } from '@/types';
import request from '@/utils/request';
import { GetServerSideProps } from 'next';

type Props = {
    productsDeleted: IProduct[];
    ordersRes: IOrder[];
};

const TrashProducts = ({ productsDeleted, ordersRes }: Props) => {
    return (
        <Layout>
            <Trash productsDeleted={productsDeleted} ordersRes={ordersRes} />
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const res = await request.get('products/deleteforce/trash');
    const orders = await request.get('orders/deleteforce/trash');

    return {
        props: {
            productsDeleted: res.data,
            ordersRes: orders.data,
        },
    };
};

export default TrashProducts;
