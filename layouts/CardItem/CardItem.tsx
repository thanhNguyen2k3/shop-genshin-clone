import { Card, Rating } from 'flowbite-react';
import Link from 'next/link';
import { useDispatch } from 'react-redux';

import { IProduct } from '@/types';
import { addProduct } from '@/redux/cartSlide';
import { useState } from 'react';
import formartUSD from '@/utils/formartUSD';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

type Props = {
    product: IProduct;
};

const CardList = ({ product }: Props) => {
    const dispath = useDispatch();
    const [quantity, setQuantity] = useState(1);

    const handleAddToCart = () => {
        dispath(addProduct({ ...product, quantity }));
    };

    return (
        <div className="pt-56 bg-white rounded shadow dark:bg-gray-700">
            <div className="relative z-20 p-6 group">
                <div className="relative block h-64 mb-4 -mt-56 overflow-hidden rounded -top-full ">
                    <img
                        className="object-cover w-full h-full transition-all group-hover:scale-110"
                        src={product.images[0]}
                        alt={product.name}
                    />
                    <div className="absolute flex flex-col top-4 right-4">
                        <a href="#" className="flex items-center">
                            <div className="relative flex items-center justify-center p-3 mb-3 transition-all translate-x-20 bg-white rounded dark:bg-secondDary dark:text-white group-hover:translate-x-0 wishlist hover:bg-blue-200 dark:hover:bg-primary group">
                                <FontAwesomeIcon icon={faHeart} className="text-primary" />
                            </div>
                        </a>
                        <button onClick={handleAddToCart} className="flex items-center">
                            <div className="relative flex items-center justify-center p-3 mb-3 transition-all translate-x-20 bg-white rounded dark:bg-secondDary dark:text-white group-hover:translate-x-0 wishlist hover:bg-blue-200 dark:hover:bg-primary group">
                                <FontAwesomeIcon icon={faCartShopping} className="text-primary" />
                            </div>
                        </button>
                    </div>
                </div>
                <Link href={`merch/${product.slug}/${product._id}`}>
                    <h2 className="mb-2 text-xl font-bold text-black dark:text-white">{product.name}</h2>
                </Link>
                <p className="mb-3 text-lg font-bold text-primary dark:text-blue-300 space-x-2">
                    <span>{formartUSD(product.price)}</span>
                    <span className="text-xs font-semibold text-gray-400 line-through ">
                        {formartUSD(product.cost)}
                    </span>
                </p>
                <div className="flex gap-1 text-orange-400">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-star-fill"
                        viewBox="0 0 16 16"
                    >
                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                    </svg>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-star-fill"
                        viewBox="0 0 16 16"
                    >
                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                    </svg>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-star-fill"
                        viewBox="0 0 16 16"
                    >
                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                    </svg>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-star-fill"
                        viewBox="0 0 16 16"
                    >
                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                    </svg>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-star"
                        viewBox="0 0 16 16"
                    >
                        <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default CardList;
