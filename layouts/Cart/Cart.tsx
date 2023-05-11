import { PayPalScriptProvider, PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { faAngleLeft, faMinus, faPlus, faTrash, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

import Link from 'next/link';
import formartUSD from '@/utils/formartUSD';
import { Alert } from 'flowbite-react';
import { IDetaisCustomer, IProduct } from '@/types';
import ModalCheckout from '../ModalCheckout/ModalCheckout';
import { getCartTotal, reset, removeProduct, increaseProduct, descreaseProduct } from '@/redux/cartSlide';
import request from '@/utils/request';

type Props = {
    cart: {
        products: IProduct[] | null;
        quantity: number;
        total: number;
    };
};

const Cart = () => {
    const cart = useSelector((state: Props) => state.cart);
    const { data: session } = useSession();

    const [open, setOpen] = useState(false);
    const [openDelivery, setOpenDelivery] = useState(false);

    const router = useRouter();
    const dispatch = useDispatch();
    // This values are the props in the UI
    const amount = cart.total;
    const currency = 'USD';
    const style = { layout: 'vertical' };
    // Set Open Paypal
    useEffect(() => {
        dispatch(getCartTotal(cart.products));
    }, [cart.products]);

    // Create order
    const createOrder = async (data: any) => {
        try {
            const res = await request.post('api/orders', data);

            res.status === 200 && router.push('/orders/' + res.data._id);
            dispatch(reset());
        } catch (error) {
            console.log(error);
        }
    };

    const handleIncrease = (id: string) => {
        dispatch(increaseProduct(id));
    };

    const handleDecrease = (id: string) => {
        dispatch(descreaseProduct(id));
    };

    const handleDeleteProductFromCart = (id: string) => {
        dispatch(removeProduct(id));
    };

    // Custom component to wrap the PayPalButtons and handle currency changes
    const ButtonWrapper = ({ currency, showSpinner }: any) => {
        // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
        // This is the main reason to wrap the PayPalButtons in a new component
        const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

        useEffect(() => {
            dispatch({
                type: 'resetOptions',
                value: {
                    ...options,
                    currency: currency,
                },
            });
        }, [currency, showSpinner]);

        return (
            <>
                <PayPalButtons
                    disabled={false}
                    forceReRender={[amount, currency, style]}
                    fundingSource={undefined}
                    createOrder={(data, actions) => {
                        return actions.order
                            .create({
                                purchase_units: [
                                    {
                                        amount: {
                                            currency_code: currency,
                                            value: amount as any,
                                        },
                                    },
                                ],
                            })
                            .then((orderId) => {
                                // Your code here after create the order
                                return orderId;
                            });
                    }}
                    onApprove={function (data, actions: any) {
                        return actions.order?.capture().then(function (details: IDetaisCustomer) {
                            // Your code here after capture the order
                            const shipping = details.purchase_units[0].shipping;

                            console.log(details);

                            createOrder({
                                customer: shipping?.name?.full_name,
                                address: shipping?.address?.address_line_1,
                                total: amount,
                                method: 1,
                            });
                        });
                    }}
                />
            </>
        );
    };

    return (
        <section className="cart-container flex items-center font-poppins dark:bg-gray-700 ">
            <div className="justify-center max-w-full flex-1 px-4 py-6 mx-auto lg:py-4 md:px-6">
                <div className="p-9 bg-gray-200/30 dark:bg-gray-800 w-layout m-auto">
                    <h2 className="mb-8 text-4xl font-bold dark:text-gray-400">Giỏ hàng của bạn</h2>

                    <button className="mb-8 hover:underline">
                        <FontAwesomeIcon className="text-primary mr-2" icon={faAngleLeft} />
                        <Link href={'/'} className=" text-primary text-xl">
                            Tiếp tục mua hàng
                        </Link>
                    </button>

                    {cart.products?.length === 0 ? (
                        <div className="flex justify-center relative">
                            <Alert color="success" className="absolute">
                                <span>
                                    <span className="font-medium">Please!</span> Hãy mua hàng của ta đi được giảm giá
                                    đó!
                                </span>
                            </Alert>
                            <img src="/cart.png" alt="" />
                        </div>
                    ) : (
                        <div className="flex flex-wrap -mx-4">
                            <div className="w-full px-4 mb-8 xl:w-8/12 xl:mb-0">
                                <div className="flex flex-wrap items-center mb-6 -mx-4 md:mb-8">
                                    <div className="w-full md:block hidden px-4 mb-6 md:w-4/6 lg:w-6/12 md:mb-0">
                                        <h2 className="font-bold text-gray-500 dark:text-gray-400">Product name</h2>
                                    </div>
                                    <div className="hidden px-4 lg:block lg:w-2/12">
                                        <h2 className="font-bold text-gray-500 dark:text-gray-400">Price</h2>
                                    </div>
                                    <div className="hidden md:block px-4 md:w-1/6 lg:w-2/12 ">
                                        <h2 className="font-bold text-gray-500 dark:text-gray-400">Quantity</h2>
                                    </div>
                                    <div className="hidden md:block px-4 text-right md:w-1/6 lg:w-2/12 ">
                                        <h2 className="font-bold text-gray-500 dark:text-gray-400"> Subtotal</h2>
                                    </div>
                                </div>
                                <div className="py-4 mb-8 border-t border-b border-gray-200 dark:border-gray-700">
                                    {cart.products &&
                                        cart.products.map((item) => {
                                            return (
                                                <div
                                                    key={item._id}
                                                    className="relative flex flex-wrap items-center mb-6 -mx-4 md:mb-8"
                                                >
                                                    <div className="w-full px-4 mb-6 md:w-4/6 lg:w-6/12 md:mb-0">
                                                        <div className="flex flex-wrap items-center -mx-4">
                                                            <div className="w-full px-4 mb-3 md:w-1/3">
                                                                <div className="w-full h-96 md:h-24 md:w-24">
                                                                    <img
                                                                        src={item.images[0]}
                                                                        alt=""
                                                                        className="object-cover w-full h-full"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="w-2/3 px-4">
                                                                <h2 className="mb-2 text-xl font-bold dark:text-gray-400">
                                                                    {item.name}
                                                                </h2>
                                                                <button
                                                                    onClick={() =>
                                                                        handleDeleteProductFromCart(item._id)
                                                                    }
                                                                    className="text-red-500 py-2 px-2 text-base hover:text-primary dark:text-gray-400"
                                                                >
                                                                    <FontAwesomeIcon icon={faTrash} />
                                                                    <span className="ml-2">Xóa sản phẩm</span>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="hidden px-4 lg:block lg:w-2/12">
                                                        <p className="text-lg font-bold text-primary dark:text-gray-400">
                                                            {formartUSD(item.price)}
                                                        </p>
                                                        <span className="text-xs text-gray-500 line-through dark:text-gray-400">
                                                            {formartUSD(item.cost)}
                                                        </span>
                                                    </div>
                                                    <div className="w-auto px-4 md:w-1/6 lg:w-2/12 ">
                                                        <div className="inline-flex items-center px-4 font-semibold text-gray-500 border border-gray-200 rounded-md dark:border-gray-700 ">
                                                            <button
                                                                onClick={() => handleDecrease(item._id)}
                                                                className="py-2 hover:text-gray-700 dark:text-gray-400"
                                                            >
                                                                <FontAwesomeIcon icon={faMinus} />
                                                            </button>

                                                            <span className="text-xl p-4 text-gray-500 dark:text-gray-400">
                                                                {item.quantity}
                                                            </span>
                                                            <button
                                                                onClick={() => handleIncrease(item._id)}
                                                                className="py-2 hover:text-gray-700 dark:text-gray-400"
                                                            >
                                                                <FontAwesomeIcon icon={faPlus} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="w-auto px-4 text-right md:w-1/6 lg:w-2/12 ">
                                                        <p className="text-lg font-bold text-primary dark:text-gray-400">
                                                            {formartUSD(item.price * item.quantity)}
                                                        </p>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                </div>
                                <div className="flex flex-wrap items-center gap-4">
                                    <span className="text-gray-700 dark:text-gray-400">Apply Coupon</span>
                                    <input
                                        type="text"
                                        className="flex-1 px-8 py-4 font-normal placeholder-gray-300 border dark:border-gray-700 dark:placeholder-gray-500 md:flex-none md:mr-6 dark:text-gray-400 dark:bg-gray-800"
                                        placeholder="x304k45"
                                    />
                                    <button className="flex-1 inline-block px-8 py-4 font-bold text-center text-gray-100 bg-primary rounded hover:bg-secondDary md:flex-none">
                                        Apply
                                    </button>
                                </div>
                            </div>
                            <div className="w-full px-4 xl:w-4/12">
                                <div className="p-6 border border-blue-100 dark:bg-gray-900 dark:border-gray-900 bg-blue-50 md:p-8">
                                    <h2 className="mb-8 text-3xl font-bold text-gray-700 dark:text-gray-400">
                                        Order Summary
                                    </h2>
                                    <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-300 dark:border-gray-700 ">
                                        <span className="text-gray-700 dark:text-gray-400">Subtotal</span>
                                        <span className="text-xl font-bold text-gray-700 dark:text-gray-400 ">
                                            {formartUSD(cart.total)}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between pb-4 mb-4 ">
                                        <span className="text-gray-700 dark:text-gray-400 ">Shipping</span>
                                        <span className="text-xl font-bold text-gray-700 dark:text-gray-400 ">
                                            Free
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between pb-4 mb-4 ">
                                        <span className="text-gray-700 dark:text-gray-400">Order Total</span>
                                        <span className="text-xl font-bold text-gray-700 dark:text-gray-400">
                                            {formartUSD(cart.total)}
                                        </span>
                                    </div>
                                    <h2 className="text-lg text-gray-500 dark:text-gray-400">We offer:</h2>

                                    {!open ? (
                                        <div
                                            onClick={() => setOpen(true)}
                                            className="flex items-center justify-between "
                                        >
                                            <button className="mt-2 block w-full py-4 font-bold text-center text-gray-100 uppercase bg-primary rounded hover:bg-secondDary">
                                                Checkout
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            {!session ? (
                                                <Alert color="warning" rounded={true} className="mt-6">
                                                    <span>
                                                        <span className="font-medium">Cảnh báo!</span>
                                                        <span className="text-base">
                                                            {' '}
                                                            Bạn phải đăng nhập để thực hiện hành động này.{' '}
                                                            <Link
                                                                className="text-primary hover:underline"
                                                                href={'/login'}
                                                            >
                                                                Đăng nhập
                                                            </Link>
                                                        </span>
                                                    </span>
                                                </Alert>
                                            ) : (
                                                <>
                                                    <div
                                                        onClick={() => setOpenDelivery(true)}
                                                        className="flex items-center justify-between "
                                                    >
                                                        <button className="mt-4 block w-full py-4 font-semibold text-center text-gray-100 uppercase bg-primary rounded hover:bg-secondDary">
                                                            thanh toán khi giao hàng
                                                        </button>
                                                    </div>
                                                    <p className="text-center py-6">— Hoặc —</p>

                                                    <div className="text-center z-10 relative">
                                                        <PayPalScriptProvider
                                                            options={{
                                                                'client-id':
                                                                    'AbZoAXHKK2WT6kY9jx6xn3DXXQKNRZw44_WLNRGieylOJmmyHYq4WhhMKTZagdrqnbh0g0lUVWY31505',
                                                                components: 'buttons',
                                                                currency: 'USD',
                                                            }}
                                                        >
                                                            <ButtonWrapper currency={currency} showSpinner={false} />
                                                        </PayPalScriptProvider>
                                                    </div>
                                                </>
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {openDelivery && (
                        <ModalCheckout
                            session={session}
                            createOrder={createOrder}
                            total={cart.total}
                            open={openDelivery}
                            setOpenDelivery={setOpenDelivery}
                        />
                    )}
                </div>
            </div>
        </section>
    );
};

export default Cart;
