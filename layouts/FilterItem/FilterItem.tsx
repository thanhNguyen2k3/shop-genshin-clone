import { addProduct } from '@/redux/cartSlide';
import { IProduct } from '@/types';
import formartUSD from '@/utils/formartUSD';
import { faCartShopping, faEye, faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Rating } from 'flowbite-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

type Props = {
    product: IProduct;
};

const FilterItem = ({ product }: Props) => {
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        return;
    }, [quantity]);

    const handleAddToCart = () => {
        dispatch(addProduct({ ...product, quantity }));
    };

    return (
        <div key={product._id} className="w-full px-3 mb-6 sm:w-1/2 md:w-1/3">
            <div className="border border-gray-300 dark:border-gray-700">
                <div className="relative bg-gray-200">
                    <a href="#" className="">
                        <img src={product.images[0]} alt={product.name} className="object-cover w-full h-56 mx-auto " />
                    </a>
                </div>
                <div className="p-3 ">
                    <Link
                        href={`/merch/${product.slug}/${product._id}`}
                        className="flex items-center justify-between gap-2 mb-2"
                    >
                        <h3 className="text-xl font-medium dark:text-gray-400 truncate">{product.name}</h3>
                        <Rating>
                            <Rating.Star />
                            <Rating.Star />
                            <Rating.Star />
                            <Rating.Star />
                            <Rating.Star filled={false} />
                        </Rating>
                    </Link>
                    <p className="text-lg ">
                        <span className="text-green-600 dark:text-green-600">{formartUSD(product.price)}</span>
                    </p>
                </div>
                <div className="flex justify-between p-4 border-t border-gray-300 dark:border-gray-700">
                    <a
                        href="#"
                        className="text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary/60"
                    >
                        <FontAwesomeIcon icon={faHeart} />
                    </a>
                    <button
                        onClick={handleAddToCart}
                        className="text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary/60"
                    >
                        <FontAwesomeIcon icon={faCartShopping} />
                    </button>
                    <a
                        href="#"
                        className="text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary/60"
                    >
                        <FontAwesomeIcon icon={faEye} />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default FilterItem;
