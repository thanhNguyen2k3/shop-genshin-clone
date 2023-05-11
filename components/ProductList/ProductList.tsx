import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import Link from 'next/link';

import { IProduct } from '@/types';
import ModalConfirm from '../ModalConfirmDelete';
import { useFomartTimeCreatedAt } from '@/utils/useFomartTimestamp';
import formartUSD from '@/utils/formartUSD';
import axios from 'axios';
import request from '@/utils/request';

type Props = {
    products: IProduct[];
};

const ProductList = ({ products }: Props) => {
    const [close, setClose] = useState(true);
    const [dataId, setDataId] = useState('');

    const handleDeleteForm = async () => {
        await request.delete(`products/${dataId}`);
    };

    if (products.length === 0)
        return (
            <div className="text-center">
                <p className="text-xl">Bạn chưa có sản phẩm nào.</p>

                <Link
                    href={'/admin/products/new'}
                    className="px-4 py-2 inline-block text-white bg-primary rounded mt-4"
                >
                    Thêm sản phẩm
                </Link>
            </div>
        );

    return (
        <div>
            {!close && <ModalConfirm onClose={setClose} handleDeleteForm={handleDeleteForm} />}

            <Link href={'/admin/products/new'} className="bg-primary px-4 py-2 rounded text-white">
                Thêm mới sản phẩm
            </Link>

            <h1 className="text-2xl my-4">Danh sách sản phẩm</h1>

            <div className="mt-4">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="p-4">
                                    <div className="flex items-center">
                                        <input
                                            id="checkbox-all-search"
                                            type="checkbox"
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        />
                                        <label htmlFor="checkbox-all-search" className="sr-only">
                                            checkbox
                                        </label>
                                    </div>
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Ảnh sản phẩm
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Tên sản phẩm
                                </th>

                                <th scope="col" className="px-6 py-3">
                                    Giá sản phẩm (USD)
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Khoảng thời gian thêm sản phẩm
                                </th>

                                <th scope="col" className="px-6 py-3">
                                    Hành động
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr
                                    key={product._id}
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                >
                                    <td className="w-4 p-4">
                                        <div className="flex items-center">
                                            <input
                                                id="checkbox-table-search-3"
                                                type="checkbox"
                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                            />
                                            <label htmlFor="checkbox-table-search-3" className="sr-only">
                                                checkbox
                                            </label>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <img src={product.images[0]} alt="" className="w-[50px] h-[50px]" />
                                    </td>
                                    <th
                                        scope="row"
                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                    >
                                        {product.name.slice(0, 8)}...
                                    </th>

                                    <td className="px-6 py-4">{formartUSD(product.price)}</td>
                                    <td className="px-6 py-4">{useFomartTimeCreatedAt(product.createdAt)}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex space-x-3">
                                            <Link
                                                href={`/admin/products/edit/${product._id}`}
                                                className="flex items-center font-medium text-white text-base dark:text-blue-500 bg-primary px-4 py-1 rounded hover:underline"
                                            >
                                                <span className="mr-1 text-sm">
                                                    <FontAwesomeIcon icon={faPenToSquare} />
                                                </span>
                                                Sửa
                                            </Link>
                                            <button
                                                onClick={() => {
                                                    setClose(false);
                                                    setDataId(product._id);
                                                }}
                                                data-id={product._id}
                                                className=" tems-center font-medium text-white text-base dark:text-blue-500 bg-red-500 px-4 py-1 rounded hover:underline"
                                            >
                                                <span className="mr-1 text-sm">
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </span>
                                                Xóa
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ProductList;
