import axios from 'axios';

import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUpload } from '@fortawesome/free-solid-svg-icons';

import { ICategory } from '@/types';
import Layout from '@/components/Layout';
import { useUploadCloud } from '@/utils/useUploadCloud';
import { ProductForm, productSchema } from '@/validate';
import ShowImagesUploaded from '@/components/ShowImagesUploaded';
import DescriptionEditor from '@/components/DescriptionEditor';
import request from '@/utils/request';
import { toast } from 'react-toastify';

type Props = {
    categories: ICategory[];
};

const NewProduct = () => {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<ProductForm>({
        resolver: yupResolver(productSchema),
        defaultValues: {
            name: '',
            description: '',
            images: [],
            category: '',
            shortDescription: '',
            cost: 0,
            price: 0,
        },
    });

    const [images, setImages] = useState<string[]>([]);
    const [isUploading, setIsUploading] = useState(false);
    const [categories, setCategories] = useState<ICategory[]>([]);

    const UploadFileToCloudinary = async (e: any) => {
        const files = e.target.files;
        setIsUploading(true);

        for (const file of files) {
            const uploadRes = await useUploadCloud(file);

            const { url } = uploadRes.data;

            setImages((prev) => [...prev, url]);
        }
        setIsUploading(false);
    };

    const getCategories = async () => {
        const categoriesRes = await request.get('categories');

        setCategories(categoriesRes.data);
    };

    useEffect(() => {
        categories && getCategories();
    }, []);

    const onSubmit = async (data: ProductForm) => {
        try {
            if (images.length === 0) {
                return alert('Bạn chưa upload ảnh nào.');
            }

            if (images.length > 3) {
                return alert('Upload không được quá 3 ảnh');
            }

            const res = await request.post('products', {
                ...data,
                images: images,
            });

            toast.success('Thêm sản phẩm thành công', {
                position: 'bottom-center',
            });

            router.push('/admin/products');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Layout>
            <div>
                <h1 className="text-2xl my-4">Thêm sản phẩm</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2" htmlFor="username">
                            Tên sản phẩm
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            placeholder="Tên sản phẩm"
                            {...register('name')}
                        />
                        <p className="text-red-500 mt-2 mb-2">{errors.name?.message}</p>
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="shortDescription"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Mô tả ngắn
                        </label>
                        <textarea
                            {...register('shortDescription')}
                            rows={4}
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Mô tả ngắn"
                        ></textarea>
                        <p className="text-red-500 mt-2 mb-2">{errors.shortDescription?.message}</p>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="description" className="block mb-2 text-sm font-medium dark:text-white">
                            Mô tả
                        </label>
                        <DescriptionEditor
                            register={register}
                            setValue={setValue}
                            watch={watch}
                            registerValue={'description'}
                        />
                        <p className="text-red-500 mt-2 mb-2">{errors.description?.message}</p>
                    </div>

                    <div className="mb-4 flex gap-2">
                        <label className="w-64 flex justify-center flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-white">
                            <FontAwesomeIcon icon={faCloudUpload} className="w-8 h-8" />
                            <span className="mt-2 text-base leading-normal">Chọn ảnh muốn tải lên</span>
                            <input
                                type="file"
                                className="hidden"
                                multiple={true}
                                {...register('images')}
                                onChange={(e) => UploadFileToCloudinary(e)}
                            />
                        </label>

                        <ShowImagesUploaded
                            images={images}
                            setImages={setImages}
                            setIsUploading={setIsUploading}
                            isUploading={isUploading}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2" htmlFor="username">
                            Chọn loại sản phẩm
                        </label>
                        <select
                            {...register('category')}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                            <option value={''}>-- Chọn loại hàng --</option>
                            {categories.map((category) => (
                                <option key={category._id} value={category._id}>
                                    {category.title}
                                </option>
                            ))}
                        </select>
                        <p className="text-red-500 mt-2 mb-2">{errors.category?.message}</p>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2" htmlFor="username">
                            Giá gốc sản phẩm (VNĐ)
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="number"
                            placeholder="Giá sản phẩm"
                            min={0}
                            {...register('cost')}
                        />
                        <p className="text-red-500 mt-2 mb-2">{errors.cost?.message}</p>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2" htmlFor="username">
                            Giá sản phẩm mới (VNĐ)
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="number"
                            placeholder="Giá sản phẩm"
                            min={0.01}
                            step={0.01}
                            {...register('price')}
                        />
                        <p className="text-red-500 mt-2 mb-2">{errors.price?.message}</p>
                    </div>

                    <button className={`${images.length === 0 && ''} bg-primary text-white text-xl px-4 py-2 rounded`}>
                        Thêm mới
                    </button>
                </form>
            </div>
        </Layout>
    );
};

export default NewProduct;
