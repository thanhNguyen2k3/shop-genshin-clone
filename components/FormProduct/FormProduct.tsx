import { FormEvent, useState } from 'react';
import axios from 'axios';
import request from '@/utils/request';

type Props = {
    _id: string;
    name: string;
    description: string;
    price: number;
};

const FormProduct = ({ _id, name: existingName, description: existingDescription, price: existingPrice }: Props) => {
    const [name, setName] = useState(existingName || '');
    const [description, setDescription] = useState(existingDescription || '');
    const [price, setPrice] = useState(existingPrice || '');

    const saveProduct = async (e: FormEvent) => {
        e.preventDefault();
        const data = { name, description, price };

        if (_id) {
            // update
            request.put(`products`, { ...data, _id });
        } else {
            // create
            await request.post('products', data);
        }
    };

    return (
        <div>
            <form onSubmit={saveProduct}>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2" htmlFor="username">
                        Tên sản phẩm
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        placeholder="Tên sản phẩm"
                        onChange={(e) => setName(e.target.value)}
                        value={name ? existingName : ''}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block mb-2 text-sm font-medium dark:text-white">
                        Mô tả
                    </label>
                    <textarea
                        rows={4}
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Mô tả"
                        onChange={(e) => setDescription(e.target.value)}
                        value={existingDescription ? existingDescription : description}
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2" htmlFor="username">
                        Giá sản phẩm (VNĐ)
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="number"
                        placeholder="Giá sản phẩm"
                        min={0}
                        onChange={(e) => setPrice(e.target.value)}
                        value={existingPrice ? existingPrice : price}
                    />
                </div>
                <button className="bg-primary text-white text-xl px-4 py-2 rounded">Thêm mới</button>
            </form>
        </div>
    );
};

export default FormProduct;
