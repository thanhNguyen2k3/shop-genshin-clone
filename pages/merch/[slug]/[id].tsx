import { GetServerSideProps } from 'next';
import { Breadcrumb, Rating } from 'flowbite-react';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import axios from 'axios';

import Layout from '@/layouts/Layout';
import { IProduct } from '@/types';
import dangerousHtml from '@/utils/dangerousHtml';
import { addProduct } from '@/redux/cartSlide';
import formartUSD from '@/utils/formartUSD';
import request from '@/utils/request';

type Props = {
    product: IProduct;
};

const Slug = ({ product }: Props) => {
    const [quantity, setQuantity] = useState(1);

    const dispath = useDispatch();
    const handleAddToCard = () => {
        dispath(addProduct({ ...product, quantity }));
    };

    const calculatePercentage = (price: number, cost: number) => {
        let result = ((price / cost - 1) * 100).toFixed(0);

        return `${result}%`;
    };

    return (
        <Layout>
            <div className="pb-10">
                <Breadcrumb aria-label="Default breadcrumb example" className="px-8">
                    <Breadcrumb.Item href="/">Trang chủ</Breadcrumb.Item>
                    <Breadcrumb.Item href={`/merch/${product.slug}/${product._id}`}>{product.slug}</Breadcrumb.Item>
                    <Breadcrumb.Item>{product.name}</Breadcrumb.Item>
                </Breadcrumb>
                <section className="overflow-hidden bg-white py-11 font-poppins dark:bg-gray-800">
                    <div className="max-w-6xl px-4 py-4 mx-auto lg:py-8 md:px-6">
                        <div className="flex flex-wrap -mx-4">
                            <div className="w-full px-4 md:w-1/2 ">
                                <div className="top-0 z-50 overflow-hidden ">
                                    <div className="relative mb-6 lg:mb-10 lg:h-2/4 ">
                                        <img
                                            src={product.images[0]}
                                            alt={product.name}
                                            className="object-cover w-full lg:h-full "
                                        />
                                    </div>
                                    <div className="flex-wrap hidden md:flex ">
                                        {product.images.map((img, index) => (
                                            <div key={index} className="w-1/2 p-2 sm:w-1/4">
                                                <div className="block border border-blue-300 dark:border-transparent dark:hover:border-blue-300 hover:border-blue-300">
                                                    <img src={img} alt="" className="object-cover w-full lg:h-20" />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="w-full px-4 md:w-1/2 ">
                                <div className="lg:pl-20">
                                    <div className="mb-8 ">
                                        <span className="text-lg font-medium text-rose-500 dark:text-rose-200">
                                            New
                                        </span>
                                        <h2 className="max-w-xl mt-2 mb-6 text-2xl font-bold dark:text-gray-400 md:text-4xl">
                                            {product.name}
                                        </h2>
                                        <p className="text-gray-600 text-lg mb-2">{product.category.title}</p>
                                        <div className="flex items-center mb-6">
                                            <Rating>
                                                <Rating.Star />
                                                <Rating.Star />
                                                <Rating.Star />
                                                <Rating.Star />
                                                <Rating.Star filled={false} />
                                            </Rating>
                                            <p className="text-xs dark:text-gray-400 ">(2 customer reviews)</p>
                                        </div>
                                        <p className="max-w-md mb-8 text-gray-700 dark:text-gray-400">
                                            {product.shortDescription}
                                        </p>
                                        <p className="inline-block mb-8 text-4xl space-x-2 font-bold text-gray-700 dark:text-gray-400 ">
                                            <span>{formartUSD(product.price)}</span>
                                            <span className="text-base font-normal text-gray-500 line-through dark:text-gray-400">
                                                {formartUSD(product.cost)}
                                            </span>
                                        </p>
                                        <p className="text-green-600 dark:text-green-300 ">7 in stock</p>
                                    </div>
                                    <div className="flex items-center mb-8">
                                        <h2 className="w-16 mr-6 text-xl font-bold dark:text-gray-400">Colors:</h2>
                                        <div className="flex flex-wrap -mx-2 -mb-2">
                                            {product.category.colors.length === 0 ? (
                                                <p>Chưa có loại màu nào.</p>
                                            ) : (
                                                product.category.colors.map((color) => (
                                                    <button
                                                        key={color}
                                                        className="p-1 mb-2 mr-2 border border-transparent hover:border-blue-400 dark:border-gray-800 dark:hover:border-gray-400 "
                                                    >
                                                        <div className={`w-6 h-6 bg-${color}`}></div>
                                                    </button>
                                                ))
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex items-center mb-8">
                                        <h2 className="w-16 text-xl font-bold dark:text-gray-400">Size:</h2>
                                        <div className="flex flex-wrap -mx-2 -mb-2">
                                            {product.category.sizes.length === 0 ? (
                                                <p>Chưa có sizes nào.</p>
                                            ) : (
                                                product.category.sizes.map((size) => (
                                                    <button
                                                        key={size}
                                                        className="py-1 mb-2 mr-1 border w-11 hover:border-blue-400 dark:border-gray-400 hover:text-blue-600 dark:hover:border-gray-300 dark:text-gray-400"
                                                    >
                                                        {size}
                                                    </button>
                                                ))
                                            )}
                                        </div>
                                    </div>
                                    <div className="w-32 mb-8 ">
                                        <label
                                            htmlFor=""
                                            className="w-full text-xl font-semibold text-gray-700 dark:text-gray-400"
                                        >
                                            Quantity
                                        </label>
                                        <div className="relative flex flex-row w-full h-10 mt-4 bg-transparent rounded-lg">
                                            <button className="w-20 h-full text-gray-600 bg-gray-300 rounded-l outline-none cursor-pointer dark:hover:bg-gray-700 dark:text-gray-400 hover:text-gray-700 dark:bg-gray-900 hover:bg-gray-400">
                                                <span className="m-auto text-2xl font-thin">-</span>
                                            </button>
                                            <input
                                                onChange={(e: any) => setQuantity(e.target.value)}
                                                type="number"
                                                className="flex items-center w-full font-semibold text-center text-gray-700 placeholder-gray-700 bg-gray-300 outline-none dark:text-gray-400 dark:placeholder-gray-400 dark:bg-gray-900 focus:outline-none text-md hover:text-black"
                                                placeholder="1"
                                            />
                                            <button className="w-20 h-full text-gray-600 bg-gray-300 rounded-r outline-none cursor-pointer dark:hover:bg-gray-700 dark:text-gray-400 dark:bg-gray-900 hover:text-gray-700 hover:bg-gray-400">
                                                <span className="m-auto text-2xl font-thin">+</span>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap items-center -mx-4 ">
                                        <div className="w-full px-4 mb-4 lg:w-1/2 lg:mb-0">
                                            <button
                                                onClick={handleAddToCard}
                                                className="flex items-center justify-center w-full p-4 text-primary border border-primary rounded-md dark:text-gray-200 dark:border-blue-600 hover:bg-primary hover:border-primary hover:text-gray-100 dark:bg-primary dark:hover:bg-primary dark:hover:border-primary dark:hover:text-gray-300"
                                            >
                                                Add to Cart
                                            </button>
                                        </div>
                                        <div className="w-full px-4 mb-4 lg:mb-0 lg:w-1/2">
                                            <button className="flex items-center justify-center w-full p-4 text-primary border border-primary rounded-md dark:text-gray-200 dark:border-blue-600 hover:bg-primary hover:border-primary hover:text-gray-100 dark:bg-primary dark:hover:bg-primary dark:hover:border-primary dark:hover:text-gray-300">
                                                Add to wishlist
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="px-8" dangerouslySetInnerHTML={dangerousHtml(product.description)}></div>
            </div>
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps<{ product: Props }> = async ({ params }: any) => {
    const res = await request.get(`products/${params.id}`);

    return {
        props: {
            product: res.data,
        },
    };
};

export default Slug;
