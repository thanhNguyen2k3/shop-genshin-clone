import {
    faAngleDown,
    faAngleUp,
    faCheck,
    faCreditCard,
    faReceipt,
    faSquareCheck,
    faTruck,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import axios from 'axios';

import { IOrder } from '@/types';
import formartUSD from '@/utils/formartUSD';
import ModalConfirmDelete from '../ModalConfirmDelete';
import { useFomartTimeCreatedAt } from '@/utils/useFomartTimestamp';
import request from '@/utils/request';

const status = [
    {
        icon: (
            <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
                <FontAwesomeIcon icon={faReceipt} />
            </span>
        ),
        title: ' Thông tin cá nhân',
        sub: 'Chi tiết các bước',
    },
    {
        icon: (
            <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
                <FontAwesomeIcon icon={faCreditCard} />
            </span>
        ),
        title: 'Chi trả',
        sub: 'Chi tiết các bước',
    },
    {
        icon: (
            <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
                <FontAwesomeIcon icon={faTruck} />
            </span>
        ),
        title: 'Shipping',
        sub: 'Chi tiết các bước',
    },
    {
        icon: (
            <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
                <FontAwesomeIcon icon={faSquareCheck} />
            </span>
        ),
        title: 'Hoàn thành',
        sub: 'Chi tiết các bước',
    },
];

type Props = {
    orders: IOrder[];
};

const OrderList = ({ orders }: Props) => {
    const [close, setClose] = useState(true);
    const [dataId, setDataId] = useState('');
    const [orderList, setOrderList] = useState<IOrder[]>(orders);
    const [showDetail, setShowDetail] = useState<number | boolean>(false);

    const statusClass = (index: number, statusValue: number) => {
        if (index - statusValue < 1)
            return (
                <span className="absolute flex items-center justify-center w-8 h-8 bg-green-200 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-green-900">
                    <FontAwesomeIcon className="w-5 h-5 text-green-500 dark:text-green-400" icon={faCheck} />
                </span>
            );

        if (index - statusValue === 1)
            return (
                <span className="absolute flex items-center justify-center w-8 h-8 bg-green-200 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-green-900">
                    <FontAwesomeIcon className="w-5 h-5 text-green-500 dark:text-green-400" icon={faCheck} />
                </span>
            );

        if (index - statusValue > 1)
            <span className="absolute flex items-center justify-center w-8 h-8 bg-green-200 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-green-900">
                <FontAwesomeIcon className="w-5 h-5 text-green-500 dark:text-green-400" icon={faCheck} />
            </span>;
    };

    const handleDeleteOrder = async () => {
        try {
            const res = await request.delete(`orders/${dataId}`);
            setOrderList((prev) => prev.filter((order) => order._id !== dataId));
            setClose(false);
        } catch (error) {
            console.log(error);
        }
    };

    const handleNextStatus = async (id: string) => {
        const item = orderList.filter((order) => order._id === id)[0];
        const currentStatus = item.status;
        toast.success('Đã cập nhật trạng thái đơn hàng!', {
            position: 'bottom-center',
        });

        try {
            const res = await request.post(`orders/${id}`, {
                status: currentStatus + 1,
            });

            setOrderList([res.data, ...orderList.filter((order) => order._id !== id)]);
        } catch (error) {
            console.log(error);
        }
    };

    const showDetailBlock = (index: number) => {
        if (showDetail === index) {
            return setShowDetail(true);
        }

        setShowDetail(index);
    };

    return (
        <>
            {!close && <ModalConfirmDelete onClose={setClose} handleDeleteForm={handleDeleteOrder} />}
            {orderList.map((order, index) => {
                return (
                    <section
                        key={order._id}
                        className="flex max-w-full mx-auto items-center md:py-2 font-poppins dark:bg-gray-800 "
                    >
                        <div className="justify-center max-w-full flex-1 px-4 py-4 mx-auto bg-white border rounded-md dark:border-gray-900 dark:bg-gray-900 md:py-6 md:px-4">
                            <div>
                                <div className="flex border-b border-gray-200 dark:border-gray-700  items-stretch justify-start w-full h-full px-4 mb-8 md:flex-row xl:flex-col md:space-x-6 lg:space-x-8 xl:space-x-0">
                                    <div className="flex items-start justify-start flex-shrink-0">
                                        <div className="flex items-center justify-center w-full pb-6 space-x-4 md:justify-start">
                                            <img
                                                src="/no-img.jpg"
                                                className="object-cover w-16 h-16 rounded-md"
                                                alt="avatar"
                                            />
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
                                <div className="flex flex-wrap items-center pb-4 mb-6 border-b border-gray-200 dark:border-gray-700">
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
                                        <p className="mb-2 text-sm leading-5 text-gray-600 dark:text-gray-400 ">
                                            Địa chỉ
                                        </p>
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
                                        <p className="text-base font-semibold leading-4 text-primary dark:text-gray-400">
                                            {formartUSD(order.total)}
                                        </p>
                                    </div>
                                    <div className="w-full px-4 mb-4 md:w-1/4">
                                        <p className="mb-2 text-sm font-medium leading-5 text-gray-800 dark:text-gray-400 ">
                                            Cập nhật trạng thái đơn hàng
                                        </p>
                                        <p className="text-base font-semibold leading-4 text-blue-600 dark:text-gray-400">
                                            <button
                                                onClick={() => handleNextStatus(order._id)}
                                                className="bg-primary px-4 py-2 text-white rounded-sm"
                                            >
                                                Cập nhật
                                            </button>
                                        </p>
                                    </div>
                                </div>
                                {/* Detail orders */}
                                <button onClick={() => showDetailBlock(index)} className="space-x-3 px-2 py-2">
                                    <span>Xem chi tiết</span>
                                    <span>
                                        {showDetail === index ? (
                                            <FontAwesomeIcon icon={faAngleUp} />
                                        ) : (
                                            <FontAwesomeIcon icon={faAngleDown} />
                                        )}
                                    </span>
                                </button>

                                <AnimatePresence>
                                    {showDetail === index && (
                                        <motion.div
                                            className="px-4 mb-10"
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            transition={{ duration: 0.3, ease: 'easeOut' }}
                                            exit={{ height: 0, opacity: 0 }}
                                        >
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
                                                            <p className="text-base leading-4 text-gray-600 dark:text-gray-400">
                                                                0%
                                                            </p>
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

                                                    <h2 className="mb-2 text-xl font-semibold text-gray-700 dark:text-gray-400">
                                                        Phương thức thanh toán
                                                    </h2>
                                                    <div className="flex flex-col items-center justify-center w-full pb-4 space-y-4 border-b border-gray-200 dark:border-gray-700">
                                                        <div className="flex justify-between w-full">
                                                            <p className="text-base text-gray-800 dark:text-gray-400">
                                                                {order.method === 0 ? (
                                                                    <span>Tiền mặt</span>
                                                                ) : (
                                                                    <span>Tiền tài khoản</span>
                                                                )}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col w-full px-2 space-y-4 md:px-8 ">
                                                    <h2 className="mb-2 text-xl font-semibold text-gray-700 dark:text-gray-400">
                                                        Shipping
                                                    </h2>
                                                    <div className="flex items-start justify-between w-full">
                                                        <div className="flex items-center justify-center space-x-2">
                                                            <ol className="relative text-gray-500 border-l border-gray-200 dark:border-gray-700 dark:text-gray-400">
                                                                {status.map((state, index) => (
                                                                    <li key={index} className="mb-10 ml-6">
                                                                        {statusClass(index, order.status)}

                                                                        <h3 className="font-medium leading-tight">
                                                                            {state.title}
                                                                        </h3>
                                                                        <p className="text-sm">{state.sub}</p>
                                                                    </li>
                                                                ))}
                                                            </ol>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </section>
                );
            })}
        </>
    );
};

export default OrderList;
