import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { ICategory } from '@/types';
import { CategoryForm, categorySchema } from '@/validate';
import axios from 'axios';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import request from '@/utils/request';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

type Props = {
    setIsClose: Dispatch<SetStateAction<boolean>>;
    categoryId: string;
    getCategories: () => Promise<void>;
};

const ModalEditCategory = ({ setIsClose, categoryId, getCategories }: Props) => {
    const router = useRouter();
    const [colors, setColors] = useState(['red-600', 'blue-600', 'pink-600', 'black', 'white', 'yellow-300']);
    const [sizes, setSizes] = useState(['XL', 'S', 'M', 'XS']);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CategoryForm>({
        resolver: yupResolver(categorySchema),
        defaultValues: async () => {
            return await getValueCategory(categoryId);
        },
    });

    const getValueCategory = async (id: string) => {
        const { data } = await request.get(`categories/${id}`);

        return data;
    };

    const onEdit = async (data: any) => {
        await request.put(`categories/${categoryId}`, data);
        setIsClose(true);
        getCategories();
        toast.success('Bạn đã sửa thành công', { position: 'bottom-center' });
    };

    return (
        <form onSubmit={handleSubmit(onEdit)}>
            <div className="fixed flex top-0 left-0 right-0 bottom-0 bg-gray-500/30 justify-center">
                <div className="mb-4 mt-16 flex space-x-1 w-[400px] h-[300px] rounded px-4 py-2 bg-white items-center">
                    <div className="w-full">
                        <div>
                            <label className="block text-sm font-bold mb-2" htmlFor="username">
                                Loại sản phẩm :
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="text"
                                placeholder="Tên loại sản phẩm"
                                {...register('title')}
                            />
                            {errors && <p className="text-red-500">{errors.title?.message}</p>}
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

                        <div className="space-x-2 mt-4">
                            <button type="submit" className={` bg-primary text-white text-xl px-6 py-1 rounded`}>
                                Lưu
                            </button>
                            <button
                                onClick={() => setIsClose(true)}
                                type="button"
                                className={` bg-gray-500 text-white text-xl px-6 py-1 rounded`}
                            >
                                Hủy
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default ModalEditCategory;
