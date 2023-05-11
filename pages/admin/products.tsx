import Layout from '@/components/Layout';
import ProductList from '@/components/ProductList';
import { IProduct } from '@/types';
import request from '@/utils/request';
import axios from 'axios';
import { GetServerSideProps } from 'next';

type Props = {
    products: IProduct[];
};

const Products = ({ products }: Props) => {
    return (
        <Layout>
            <ProductList products={products} />
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps<{ products: Props }> = async (context) => {
    const res = await request.get('products');

    return {
        props: {
            products: res.data,
        },
    };
};

export default Products;
