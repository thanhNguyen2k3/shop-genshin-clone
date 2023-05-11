import { ICart, IProduct } from '@/types';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { getCartTotal, removeProduct } from '@/redux/cartSlide';
import formartUSD from '@/utils/formartUSD';
import Link from 'next/link';
import { Alert } from 'flowbite-react';
import { motion, AnimatePresence } from 'framer-motion';

type Props = {
    cart: {
        products: IProduct[];
        quantity: number;
        total: number;
    };
};

type Open = {
    setOpen: Dispatch<SetStateAction<boolean>>;
    open: boolean;
};

const SmallCart = ({ open, setOpen }: Open) => {
    const cart = useSelector((state: Props) => state.cart);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCartTotal(cart.products));
    }, [cart.products]);

    const handleDeleteCartItem = (id: string) => {
        dispatch(removeProduct(id));
    };

    return (
        <>
            <AnimatePresence>
                <div className="relative font-poppins">
                    <div className="fixed inset-0 z-50 bg-gray-900/30"></div>
                    {open && (
                        <motion.div
                            animate={{ width: 'auto', opacity: 1 }}
                            initial={{ width: 0, opacity: 0 }}
                            transition={{ duration: 0.2, ease: 'easeOut' }}
                            exit={{ width: 0, opacity: 0 }}
                            className="fixed shadow-lg shadow-black/80 z-50 top-0 bottom-0 right-0 w-full max-w-xl overflow-y-scroll bg-white dark:bg-gray-800"
                        >
                            <div className="p-6 bg-white md:pt-12 md:pb-6 md:px-12 dark:bg-gray-800">
                                <div className="text-right">
                                    <button
                                        onClick={() => setOpen(false)}
                                        className="text-gray-700 p-4 right-10 top-6 hover:bg-primary hover:text-white rounded-sm absolute dark:text-gray-400"
                                    >
                                        <FontAwesomeIcon icon={faXmark} />
                                    </button>
                                </div>
                                <div className="flex items-center mb-10">
                                    <h2 className="text-3xl font-bold dark:text-gray-400 ">Shopping Cart</h2>
                                    <span className="inline-flex items-center justify-center w-8 h-8 ml-4 text-base font-bold bg-red-600 rounded-full dark:text-gray-400 dark:bg-gray-700 text-gray-50">
                                        {cart.quantity}
                                    </span>
                                </div>

                                {cart.products.length === 0 ? (
                                    <div className="flex justify-center relative">
                                        <Alert color="success" className="absolute">
                                            <span>
                                                <span className="font-medium">Please!</span> Hãy mua hàng của ta đi được
                                                giảm giá đó!
                                            </span>
                                        </Alert>
                                        <img src="/cart.png" alt="" />
                                    </div>
                                ) : (
                                    cart.products.map((item) => (
                                        <div
                                            key={item._id}
                                            className="block pb-6 mb-6 -mx-4 border-b border-gray-200 dark:border-gray-700 md:flex"
                                        >
                                            <div className="w-full px-4 mb-6 md:w-1/3 md:mb-0">
                                                <div className="flex w-full h-96 md:h-32 md:w-32">
                                                    <img
                                                        src={item.images[0]}
                                                        alt={item.name}
                                                        className="object-cover w-full h-full rounded-md"
                                                    />
                                                </div>
                                            </div>
                                            <div className="w-full px-4 md:2/3">
                                                <div className="flex justify-between">
                                                    <div className="">
                                                        <h2 className="mb-2 text-xl font-bold dark:text-gray-400">
                                                            {item.name}
                                                        </h2>
                                                        <p className="mb-4 text-sm font-medium text-gray-600 dark:text-gray-400 ">
                                                            số lượng: {item.quantity}
                                                        </p>
                                                        <div>
                                                            <button
                                                                onClick={() => handleDeleteCartItem(item._id)}
                                                                className="px-4 py-2 font-medium text-center text-primary border border-primary rounded-md dark:hover:border-primary dark:hover:bg-primary dark:text-gray-400 dark:border-gray-700 hover:bg-primary hover:text-gray-100"
                                                            >
                                                                Xóa
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <p className="text-lg font-bold text-primary dark:text-gray-400">
                                                            {formartUSD(item.price)}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}

                                <div className="flex justify-between text-base dark:text-gray-400">
                                    <p>Subtotal</p>
                                    <p>{formartUSD(cart.total)}</p>
                                </div>
                                <p className="mt-4 text-sm text-gray-500 dark:text-gray-500">
                                    Shipping calculated at checkout period.
                                </p>
                                <div className="flex items-center justify-center mt-6">
                                    <Link
                                        href={'/cart'}
                                        className="w-full text-center py-3 text-lg font-medium bg-primary rounded-md text-gray-50 hover:bg-secondDary"
                                    >
                                        Xem giỏ hàng
                                    </Link>
                                </div>
                                <div className="flex items-center justify-center mt-6">
                                    <p>
                                        <span className="dark:text-gray-400">or,</span>
                                        <button
                                            onClick={() => setOpen(false)}
                                            className="pl-1 text-primary hover:underline dark:text-gray-300"
                                        >
                                            Tiếp tục mua sắm
                                        </button>
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </div>
            </AnimatePresence>
        </>
    );
};

export default SmallCart;
