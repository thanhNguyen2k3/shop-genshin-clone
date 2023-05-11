import { IOrder, IProduct } from '@/types';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import ModalConfirmDeleteForce from '../ModalConfirmDeleteForce';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useFomartTimeCreatedAt } from '@/utils/useFomartTimestamp';
import { toast } from 'react-toastify';
import request from '@/utils/request';

type Props = {
    productsDeleted: IProduct[];
    ordersRes: IOrder[];
};

const Trash = ({ productsDeleted, ordersRes }: Props) => {
    const [close, setClose] = useState(true);
    const [dataIdDeleted, setDataIdDeleted] = useState('');

    const router = useRouter();

    const handleDelete = (id: string) => {
        setDataIdDeleted(id);
        setClose(true);
    };

    const handleRestoreOrder = async (id: string) => {
        await request.patch(`orders/deleteforce/${id}`);
        toast.success('Bạn đã khôi phục thành công sản phẩm này', { position: 'bottom-center' });
        router.push('');
    };

    const handleRestore = async (id: string) => {
        await request.patch(`products/deleteforce/${id}`);
        toast.success('Bạn đã khôi phục thành công sản phẩm này', { position: 'bottom-center' });
        router.push('');
    };

    return (
        <>
            {productsDeleted.length === 0 ? (
                <div className="text-center">
                    <p className="text-xl">Không có sản phẩm nào trong thùng rác.</p>

                    <Link
                        href={'/admin/products/new'}
                        className="px-4 py-2 inline-block text-white bg-primary rounded mt-4"
                    >
                        Thêm sản phẩm
                    </Link>
                </div>
            ) : (
                <div>
                    {!close && <ModalConfirmDeleteForce onClose={setClose} dataIdDeleted={dataIdDeleted} />}

                    <Link href={'/admin/products'} className="bg-primary px-4 py-2 rounded text-white">
                        Danh sách sản phẩm
                    </Link>

                    <h1 className="text-2xl my-4">Danh sách sản phẩm đã xóa</h1>

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
                                            Mô tả
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Giá sản phẩm
                                        </th>

                                        <th scope="col" className="px-6 py-3">
                                            hành động
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {productsDeleted.map((product) => (
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
                                                {product.name.slice(0, 7)}...
                                            </th>
                                            <td className="px-6 py-4">{product.description.slice(0, 8)}...</td>
                                            <td className="px-6 py-4">{product.price}</td>
                                            <td className="flex items-center px-6 py-4 space-x-3">
                                                <button
                                                    onClick={() => handleRestore(product._id)}
                                                    className="flex items-center font-medium text-white text-base dark:text-blue-500 bg-primary px-4 py-1 rounded hover:underline"
                                                >
                                                    <span className="mr-1 text-sm">
                                                        <FontAwesomeIcon icon={faPenToSquare} />
                                                    </span>
                                                    Khôi phục
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(product._id)}
                                                    data-id={product._id}
                                                    className="flex items-center font-medium text-white text-base dark:text-blue-500 bg-red-500 px-4 py-1 rounded hover:underline"
                                                >
                                                    <span className="mr-1 text-sm">
                                                        <FontAwesomeIcon icon={faTrash} />
                                                    </span>
                                                    Xóa vĩnh viễn
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {ordersRes.length === 0 ? (
                <div className="text-center">
                    <p className="text-xl">Không tìm thấy khách hàng nào được xóa.</p>

                    <Link href={'/admin/orders'} className="px-4 py-2 inline-block text-white bg-primary rounded mt-4">
                        Quản lý khách hàng
                    </Link>
                </div>
            ) : (
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Tên khách hàng
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Địa chỉ Email
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Số điện thoại
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Tỉnh / Thành phố
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Địa chỉ giao hàng
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Thời gian đặt hàng
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Hành động
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {ordersRes.map((order) => (
                                <tr key={order._id} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                    <th
                                        scope="row"
                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                    >
                                        {order.customer}
                                    </th>
                                    <td className="px-6 py-4">{order.email}</td>
                                    <td className="px-6 py-4">{order.phone}</td>
                                    <td className="px-6 py-4">{order.city}</td>
                                    <td className="px-6 py-4 text-ellipsis overflow-hidden">{order.address}</td>
                                    <td className="px-6 py-4 truncate">{useFomartTimeCreatedAt(order.createdAt)}</td>
                                    <td className="flex items-center px-6 py-4 space-x-3">
                                        <button
                                            onClick={() => handleRestoreOrder(order._id)}
                                            className="flex items-center font-medium text-white text-base dark:text-blue-500 bg-primary px-4 py-1 rounded hover:underline"
                                        >
                                            <span className="mr-1 text-sm">
                                                <FontAwesomeIcon icon={faPenToSquare} />
                                            </span>
                                            Khôi phục
                                        </button>
                                        <button className="flex items-center font-medium text-white text-base dark:text-blue-500 bg-red-500 px-4 py-1 rounded hover:underline">
                                            <span className="mr-1 text-sm">
                                                <FontAwesomeIcon icon={faTrash} />
                                            </span>
                                            Xóa vĩnh viễn
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
};
export default Trash;
