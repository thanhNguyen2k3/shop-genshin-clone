import CartList from '@/layouts/CardList';
import CarouselElement from '@/layouts/Carousel';
import Layout from '@/layouts/Layout';
import { IProduct } from '@/types';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import request from '@/utils/request';

const slides = [
    {
        id: 1,
        slide: '/slide1.png',
    },
    {
        id: 2,
        slide: '/slide2.png',
    },
    {
        id: 3,
        slide: '/slide3.png',
    },
    {
        id: 4,
        slide: '/slide4.png',
    },
    {
        id: 5,
        slide: '/slide5.png',
    },
];

type Props = {
    products: IProduct[];
};

export default function Home({ products }: Props) {
    return (
        <div className="layout-wrapper m-auto max-w-full">
            <div className="bg-wrapper bg-cover bg-center">
                <Layout>
                    <div>
                        <CarouselElement slides={slides} />
                        <div className="mt-2 m-auto max-w-full bg-white rounded-sm pb-10">
                            <div className="w-layout m-auto">
                                <h1 className="text-gray-400 text-xl text-center px-6 pt-16 md:text-lg max-sm:text-base">
                                    Genshin Impact là một trò chơi điện tử nổi tiếng do miHoYo phát triển đã thu hút
                                    được một lượng người hâm mộ đáng kể kể từ khi phát hành vào năm 2020. Có rất nhiều
                                    loại hàng hóa khác nhau trong Genshin Impact, bao gồm Quần áo, Phụ kiện, Thú nhồi
                                    bông, Nhân vật, Máy tính & Thiết bị Kỹ thuật số, Sách nghệ thuật, OST Album CD và
                                    thậm chí một số sản phẩm Phiên bản giới hạn và đồ sưu tầm, v.v.
                                </h1>

                                <div>
                                    <h1 className="text-center text-3xl font-medium mt-14 mb-14">Hàng Hóa Mới Nhất</h1>

                                    <CartList products={products} />
                                </div>
                            </div>
                        </div>
                    </div>
                </Layout>
            </div>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps<{ products: Props }> = async (context) => {
    const res = await request.get('products');

    return {
        props: {
            products: res.data,
        },
    };
};
