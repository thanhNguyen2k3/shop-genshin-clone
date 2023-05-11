import Layout from '@/layouts/Layout/Layout';
import { IOrder } from '@/types';
import formartUSD from '@/utils/formartUSD';
import request from '@/utils/request';
import { useFomartTimeCreatedAt } from '@/utils/useFomartTimestamp';
import { faCheck, faCreditCard, faReceipt, faSquareCheck, faTruck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import Link from 'next/link';

type Props = {
    order: IOrder;
};

const Order = ({ order }: Props) => {
    const status = order.status;

    const statusClass = (index: number) => {
        if (index - status < 1)
            return (
                <span className="absolute flex items-center justify-center w-8 h-8 bg-green-200 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-green-900">
                    <FontAwesomeIcon className="w-5 h-5 text-green-500 dark:text-green-400" icon={faCheck} />
                </span>
            );

        if (index - status === 1)
            return (
                <span className="absolute flex items-center justify-center w-8 h-8 bg-green-200 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-green-900">
                    <FontAwesomeIcon className="w-5 h-5 text-green-500 dark:text-green-400" icon={faCheck} />
                </span>
            );

        if (index - status > 1)
            <span className="absolute flex items-center justify-center w-8 h-8 bg-green-200 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-green-900">
                <FontAwesomeIcon className="w-5 h-5 text-green-500 dark:text-green-400" icon={faCheck} />
            </span>;
    };

    return (
        <Layout>
            <section className="flex w-layout mx-auto items-center py-16 md:py-20 font-poppins dark:bg-gray-800 ">
                <div className="justify-center max-w-full flex-1 px-4 py-4 mx-auto bg-white border rounded-md dark:border-gray-900 dark:bg-gray-900 md:py-10 md:px-10">
                    <div>
                        <h1 className="px-4 mb-8 text-2xl font-semibold tracking-wide text-gray-700 dark:text-gray-300 ">
                            Cảm ơn. Đơn đặt hàng của bạn đã được nhận;.{' '}
                        </h1>
                        <div className="flex border-b border-gray-200 dark:border-gray-700  items-stretch justify-start w-full h-full px-4 mb-8 md:flex-row xl:flex-col md:space-x-6 lg:space-x-8 xl:space-x-0">
                            <div className="flex items-start justify-start flex-shrink-0">
                                <div className="flex items-center justify-center w-full pb-6 space-x-4 md:justify-start">
                                    <img src="/no-img.jpg" className="object-cover w-16 h-16 rounded-md" alt="avatar" />
                                    <div className="flex flex-col items-start justify-start space-y-2">
                                        <p className="text-lg font-semibold leading-4 text-left text-gray-800 dark:text-gray-400">
                                            {order.customer}
                                        </p>

                                        <p className="text-sm leading-4 cursor-pointer dark:text-gray-400">
                                            {order.email}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-wrap items-center pb-4 mb-10 border-b border-gray-200 dark:border-gray-700">
                            <div className="w-full px-4 mb-4 md:w-1/4">
                                <p className="mb-2 text-sm leading-5 text-gray-600 dark:text-gray-400 ">
                                    Số điện thoại:{' '}
                                </p>
                                <p className="text-base font-semibold leading-4 text-gray-800 dark:text-gray-400">
                                    {order.phone}
                                </p>
                            </div>
                            <div className="w-full px-4 mb-4 md:w-1/4">
                                <p className="mb-2 text-sm leading-5 text-gray-600 dark:text-gray-400 ">
                                    Ngày mua hàng:{' '}
                                </p>
                                <p className="text-base font-semibold leading-4 text-gray-800 dark:text-gray-400 truncate">
                                    {useFomartTimeCreatedAt(order.createdAt)}
                                </p>
                            </div>
                            <div className="w-full px-4 mb-4 md:w-1/4">
                                <p className="mb-2 text-sm leading-5 text-gray-600 dark:text-gray-400 ">Địa chỉ</p>
                                <p className="text-base font-semibold leading-4 text-gray-800 dark:text-gray-400 truncate">
                                    {order.address}
                                </p>
                            </div>
                            <div className="w-full px-4 mb-4 md:w-1/4">
                                <p className="mb-2 text-sm leading-5 text-gray-600 dark:text-gray-400 ">
                                    Tỉnh/Thành phố
                                </p>
                                <p className="text-base font-semibold leading-4 text-gray-800 dark:text-gray-400">
                                    {order.city}
                                </p>
                            </div>
                            <div className="w-full px-4 mb-4 md:w-1/4">
                                <p className="mb-2 text-sm font-medium leading-5 text-gray-800 dark:text-gray-400 ">
                                    Total:{' '}
                                </p>
                                <p className="text-base font-semibold leading-4 text-blue-600 dark:text-gray-400">
                                    {formartUSD(order.total)}
                                </p>
                            </div>
                        </div>
                        <div className="px-4 mb-10">
                            <div className="flex flex-col items-stretch justify-center w-full space-y-4 md:flex-row md:space-y-0 md:space-x-8">
                                <div className="flex flex-col w-full space-y-6 ">
                                    <h2 className="mb-2 text-xl font-semibold text-gray-700 dark:text-gray-400">
                                        Chi tiết đơn hàng
                                    </h2>
                                    <div className="flex flex-col items-center justify-center w-full pb-4 space-y-4 border-b border-gray-200 dark:border-gray-700">
                                        <div className="flex justify-between w-full">
                                            <p className="text-base leading-4 text-gray-800 dark:text-gray-400">
                                                Tổng phụ
                                            </p>
                                            <p className="text-base leading-4 text-gray-600 dark:text-gray-400">
                                                {formartUSD(order.total)}
                                            </p>
                                        </div>
                                        <div className="flex items-center justify-between w-full">
                                            <p className="text-base leading-4 text-gray-800 dark:text-gray-400">
                                                Giảm giá
                                            </p>
                                            <p className="text-base leading-4 text-gray-600 dark:text-gray-400">0%</p>
                                        </div>
                                        <div className="flex items-center justify-between w-full">
                                            <p className="text-base leading-4 text-gray-800 dark:text-gray-400">
                                                Shipping
                                            </p>
                                            <p className="text-base leading-4 text-gray-600 dark:text-gray-400">
                                                {formartUSD(order.total)}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between w-full">
                                        <p className="text-base font-semibold leading-4 text-gray-800 dark:text-gray-400">
                                            Tổng
                                        </p>
                                        <p className="text-base font-semibold leading-4 text-gray-600 dark:text-gray-400">
                                            {formartUSD(order.total)}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-col w-full px-2 space-y-4 md:px-8 ">
                                    <h2 className="mb-2 text-xl font-semibold text-gray-700 dark:text-gray-400">
                                        Shipping
                                    </h2>
                                    <div className="flex items-start justify-between w-full">
                                        <div className="flex items-center justify-center space-x-2">
                                            <ol className="relative text-gray-500 border-l border-gray-200 dark:border-gray-700 dark:text-gray-400">
                                                <li className="mb-10 ml-6">
                                                    <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
                                                        <FontAwesomeIcon
                                                            className="w-5 h-5 text-gray-500 dark:text-gray-400"
                                                            icon={faReceipt}
                                                        />
                                                    </span>
                                                    {statusClass(0)}
                                                    <h3 className="font-medium leading-tight">Thông tin cá nhân</h3>
                                                    <p className="text-sm">Chi tiết các bước</p>
                                                </li>

                                                <li className="mb-10 ml-6">
                                                    <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
                                                        <FontAwesomeIcon
                                                            className="w-5 h-5 text-gray-500 dark:text-gray-400"
                                                            icon={faCreditCard}
                                                        />
                                                    </span>
                                                    {statusClass(1)}
                                                    <h3 className="font-medium leading-tight">Chi trả</h3>
                                                    <p className="text-sm">Chi tiết các bước</p>
                                                </li>

                                                <li className="mb-10 ml-6">
                                                    <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
                                                        <FontAwesomeIcon
                                                            className="w-5 h-5 text-gray-500 dark:text-gray-400"
                                                            icon={faTruck}
                                                        />
                                                    </span>
                                                    {statusClass(2)}
                                                    <h3 className="font-medium leading-tight">Shipping</h3>
                                                    <p className="text-sm">Chi tiết các bước</p>
                                                </li>
                                                <li className="ml-6">
                                                    <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
                                                        <FontAwesomeIcon
                                                            className="w-5 h-5 text-gray-500 dark:text-gray-400"
                                                            icon={faSquareCheck}
                                                        />
                                                    </span>
                                                    {statusClass(3)}
                                                    <h3 className="font-medium leading-tight">Hoàn thành</h3>
                                                    <p className="text-sm">Chi tiết các bước</p>
                                                </li>
                                            </ol>
                                        </div>
                                        <p className="text-lg font-semibold leading-6 text-gray-800 dark:text-gray-400">
                                            Rs.50
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-wrap items-center justify-start gap-4 px-4 mt-6 ">
                            <Link
                                href="/"
                                className="w-full px-4 py-2 text-primary border border-primary rounded-md md:w-auto hover:text-gray-100 hover:bg-secondDary dark:border-gray-700 dark:hover:bg-gray-700 dark:text-gray-300"
                            >
                                Trở về cửa hàng
                            </Link>
                            <button className="w-full px-4 py-2 bg-primary rounded-md text-gray-50 md:w-auto dark:text-gray-300 hover:bg-secondDary dark:hover:bg-gray-700 dark:bg-gray-800">
                                Xem tiến trình hàng hóa
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ params }: any) => {
    const res = await request.get(`orders/${params.id}`);

    return {
        props: {
            order: res.data,
        },
    };
};

export default Order;
