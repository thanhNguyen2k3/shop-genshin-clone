import Layout from '@/components/Layout';
import OrderList from '@/components/OrderList';
import { IOrder } from '@/types';
import request from '@/utils/request';
import axios from 'axios';
import { GetServerSideProps } from 'next';

type Props = {
    orders: IOrder[];
};

const Orders = ({ orders }: Props) => {
    return (
        <Layout>
            <OrderList orders={orders} />
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps<{ orders: Props }> = async (context) => {
    const res = await request.get('orders');

    return {
        props: {
            orders: res.data,
        },
    };
};

export default Orders;
