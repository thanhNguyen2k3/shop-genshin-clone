import FilterContainer from '@/layouts/FilterContainer';
import Layout from '@/layouts/Layout';
import { ICategory, IProduct } from '@/types';
import request from '@/utils/request';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

type Props = {
    products: IProduct[];
    categories: ICategory[];
};

const FilterPage = ({ products, categories }: Props) => {
    const router = useRouter();

    return (
        <Layout>
            <FilterContainer products={products} categories={categories} />
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps<{ products: Props }> = async (context) => {
    const { slug } = context.query;

    const productsRes = await request.get('products');
    const categoryRes = await request.get('categories');

    return {
        props: {
            products: productsRes.data,
            categories: categoryRes.data,
        },
    };
};

export default FilterPage;
