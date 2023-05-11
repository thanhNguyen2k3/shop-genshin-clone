import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Layout from '@/components/Layout';
import { CategoryForm, categorySchema } from '@/validate';
import { ICategory } from '@/types';
import { useEffect, useState } from 'react';
import ModalEditCategory from '@/components/ModalEditCategory/ModalEditCategory';
import request from '@/utils/request';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

type Props = {
    category: ICategory;
};

const CategoriesList = () => {
    const router = useRouter();

    const [isClose, setIsClose] = useState(true);
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [categoryId, setCategoryId] = useState('');
    const [colors, setColors] = useState(['red-600', 'blue-600', 'pink-600', 'black', 'white', 'yellow-300']);
    const [sizes, setSizes] = useState(['XL', 'S', 'M', 'XS']);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<CategoryForm>({
        resolver: yupResolver(categorySchema),
        defaultValues: {
            title: '',
            colors: [],
            sizes: [],
        },
    });

    const handelDeleteCategory = async (id: string) => {
        await request.delete(`categories/${id}`);
        toast.info('Bạn đã xóa thành công', { position: 'bottom-center' });
        getCategories();
    };

    const onSaveCategory = async (data: CategoryForm) => {
        await request.post('categories', data);
        reset({
            title: '',
            colors: [],
            sizes: [],
        });
        toast.success('Bạn đã thêm thành công', { position: 'bottom-center' });
        getCategories();
    };

    const getCategories = async () => {
        const categoriesRes = await request.get('categories');
        setCategories(categoriesRes.data);
    };

    useEffect(() => {
        getCategories();
    }, []);

    return (
        <Layout>
            <>
                {!isClose && (
                    <ModalEditCategory setIsClose={setIsClose} categoryId={categoryId} getCategories={getCategories} />
                )}
                <div>
                    <h1 className="text-2xl my-4">Thêm loại sản phẩm</h1>
                    <form onSubmit={handleSubmit(onSaveCategory)}>
                        <div>
                            <label className="block text-lg font-bold mb-2" htmlFor="username">
                                Tên loại sản phẩm
                            </label>
                            <div className="mb-4 flex space-x-1">
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    type="text"
                                    placeholder="Tên loại sản phẩm"
                                    {...register('title')}
                                />
                            </div>
                            <p className="text-red-500 mb-4">{errors.title?.message}</p>
                        </div>
                        <div>
                            <h2 className="flex w-full mr-6 text-xl font-bold dark:text-gray-400 mb-2">
                                Màu đã chọn:{' '}
                            </h2>

                            <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                                {colors.map((color, index) => (
                                    <li
                                        key={index}
                                        className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600"
                                    >
                                        <div className="flex items-center pl-3">
                                            <input
                                                {...register('colors')}
                                                value={color}
                                                type="checkbox"
                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                            />
                                            <label
                                                htmlFor="vue-checkbox-list"
                                                className={`bg-${color} w-6 py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300`}
                                            ></label>
                                        </div>
                                    </li>
                                ))}
                            </ul>

                            <p className="text-red-500">{errors.colors?.message}</p>
                        </div>
                        <div>
                            <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">Chọn size:</h3>
                            <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                                {sizes.map((size, index) => (
                                    <li
                                        key={index}
                                        className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600"
                                    >
                                        <div className="flex items-center pl-3">
                                            <input
                                                {...register('sizes')}
                                                type="checkbox"
                                                value={size}
                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                            />
                                            <label
                                                htmlFor="vue-checkbox-list"
                                                className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                            >
                                                {size}
                                            </label>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <p className="text-red-500 mb-4">{errors.sizes?.message}</p>
                        </div>

                        <button className={` bg-primary text-white text-xl px-4 py-2 rounded`}>Lưu</button>
                    </form>

                    {categories.length === 0 ? (
                        <p>Bạn chưa có loại hàng nào vui lòng thêm loại hàng.</p>
                    ) : (
                        <div className="mt-4">
                            <div className="overflow-x-auto shadow-md sm:rounded-lg">
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
                                                Tên loại hàng
                                            </th>

                                            <th scope="col" className="px-6 py-3">
                                                hành động
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {categories.map((category) => (
                                            <tr
                                                key={category._id}
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

                                                <th
                                                    scope="row"
                                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                                >
                                                    {category.title}
                                                </th>

                                                <td className="px-6 py-4">
                                                    <div className="flex space-x-3">
                                                        <button
                                                            onClick={() => {
                                                                setIsClose(false);
                                                                setCategoryId(category._id);
                                                            }}
                                                            className="flex items-center font-medium text-white text-base dark:text-blue-500 bg-primary px-4 py-1 rounded hover:underline"
                                                        >
                                                            <span className="mr-1 text-sm">
                                                                <FontAwesomeIcon icon={faPenToSquare} />
                                                            </span>
                                                            Sửa
                                                        </button>
                                                        <button
                                                            onClick={() => handelDeleteCategory(category._id)}
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
                    )}
                </div>
            </>
        </Layout>
    );
};

export default CategoriesList;
