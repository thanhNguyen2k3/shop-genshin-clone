import { IProduct } from '@/types';
import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
// import { toast } from 'react-toastify';

type Props = {
    state: {
        products: any[];
        total: number;
        quantity: number;
    };
    action: {
        payload: any;
        type: string;
    };
};

const initialState = {
    products: [],
    total: 0,
    quantity: 0,
};

const cartSlide = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        getCartTotal: (state, action) => {
            let { totalAmount, totalCount } = state.products.reduce(
                (cartTotal, cartItem) => {
                    const { price, quantity } = cartItem;
                    const itemTotal = price * quantity;

                    cartTotal.totalAmount += itemTotal;
                    cartTotal.totalCount += quantity;
                    return cartTotal;
                },
                {
                    totalAmount: 0,
                    totalCount: 0,
                },
            );
            state.total = parseInt(totalAmount.toFixed(2));
            state.quantity = totalCount;
        },
        addProduct: (state: any, action) => {
            const existingIndex = state.products.findIndex((item: any) => item._id === action.payload._id);

            if (existingIndex >= 0) {
                state.products[existingIndex] = {
                    ...state.products[existingIndex],
                    quantity: (state.products[existingIndex].quantity += 1),
                };
                toast.info('Sản phẩm đã có trong giỏ hàng', {
                    position: 'bottom-center',
                });
            } else {
                state.products.push(action.payload);
                state.quantity += 1;
                state.total += action.payload.price * action.payload.quantity;
                toast.success('Sản phẩm đã được thêm vào giỏ hàng của bạn', {
                    position: 'bottom-center',
                });
            }
        },
        increaseProduct(state: any, action) {
            state.products = state.products.map((item: IProduct) => {
                if (item._id === action.payload) {
                    return { ...item, quantity: item.quantity + 1 };
                }
                return item;
            });
        },
        descreaseProduct(state: any, action) {
            state.products = state.products
                .map((item: IProduct) => {
                    if (item._id === action.payload) {
                        return { ...item, quantity: item.quantity - 1 };
                    }
                    return item;
                })
                .filter((cartItem: IProduct) => cartItem.quantity !== 0);
        },
        removeProduct(state: any, action) {
            state.products = state.products.filter((item: IProduct) => item._id !== action.payload);
            toast.error('Sản phẩm đã bị xóa khỏi giỏ hàng của bạn', {
                position: 'bottom-center',
            });
        },
        reset: (state) => {
            state.products = [];
            state.quantity = 0;
            state.total = 0;
        },
    },
});

export const { getCartTotal, increaseProduct, descreaseProduct, addProduct, removeProduct, reset } = cartSlide.actions;

export default cartSlide.reducer;
