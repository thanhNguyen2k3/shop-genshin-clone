import { ICategory, IProduct } from '@/types';
import FilterItem from '../FilterItem/FilterItem';
import { useEffect, useState } from 'react';
import request from '@/utils/request';

type Props = {
    products: IProduct[];
    categories: ICategory[];
};

const FilterContainer = ({ products, categories }: Props) => {
    const [categoriesId, setCategoriesId] = useState<ICategory[]>([]);
    const [productsApi, setProductApi] = useState<IProduct[]>(products);

    const filterApi = async () => {
        const filter = await request.get(`products?categories=${categoriesId}`);

        setProductApi(filter.data);
    };

    const handleChange = (e: any) => {
        const { checked, value } = e.target;

        if (checked) {
            setCategoriesId((prev) => [...prev, value]);
        } else {
            setCategoriesId((prev) => [...prev.filter((item) => item !== value)]);
        }
    };

    useEffect(() => {
        filterApi();
    }, [categoriesId]);

    return (
        <div>
            <section className="py-20 bg-gray-50 font-poppins dark:bg-gray-800 ">
                <div className="px-4 py-4 mx-auto max-w-7xl lg:py-6 md:px-6">
                    <div className="flex flex-wrap mb-24 -mx-3">
                        {/* Filter Block */}
                        <div className="w-full pr-2 lg:w-1/4 lg:block">
                            <div className="p-4 mb-5 bg-white border border-gray-200 dark:border-gray-900 dark:bg-gray-900">
                                <h2 className="text-2xl font-bold dark:text-gray-400"> Categories</h2>
                                <div className="w-16 pb-2 mb-6 border-b border-rose-600 dark:border-gray-400"></div>
                                {/* List category */}

                                <ul>
                                    {categories.map((category) => (
                                        <li key={category._id} className="mb-4">
                                            <label className="flex items-center dark:text-gray-400 ">
                                                <input
                                                    onChange={handleChange}
                                                    value={category._id}
                                                    type="checkbox"
                                                    className="w-4 h-4 mr-2"
                                                />
                                                <span className="text-lg">{category.title}</span>
                                            </label>
                                        </li>
                                    ))}
                                </ul>
                                <a
                                    href="#"
                                    className="text-base font-medium text-blue-500 hover:underline dark:text-blue-400"
                                >
                                    View More
                                </a>
                            </div>
                            <div className="p-4 mb-5 bg-white border border-gray-200 dark:bg-gray-900 dark:border-gray-900">
                                <h2 className="text-2xl font-bold dark:text-gray-400">Thông tin sản phẩm</h2>
                                <div className="w-16 pb-2 mb-6 border-b border-rose-600 dark:border-gray-400"></div>
                                <ul>
                                    <li className="mb-4">
                                        <label htmlFor="" className="flex items-center dark:text-gray-300">
                                            <input type="checkbox" className="w-4 h-4 mr-2" />
                                            <span className="text-lg dark:text-gray-400">Kho</span>
                                        </label>
                                    </li>
                                    <li className="mb-4">
                                        <label htmlFor="" className="flex items-center dark:text-gray-300">
                                            <input type="checkbox" className="w-4 h-4 mr-2" />
                                            <span className="text-lg dark:text-gray-400">Giảm giá</span>
                                        </label>
                                    </li>
                                </ul>
                            </div>
                            <div className="p-4 mb-5 bg-white border border-gray-200 dark:bg-gray-900 dark:border-gray-900">
                                <h2 className="text-2xl font-bold dark:text-gray-400">Thương hiệu</h2>
                                <div className="w-16 pb-2 mb-6 border-b border-rose-600 dark:border-gray-400"></div>
                                <ul>
                                    <li className="mb-4">
                                        <label htmlFor="" className="flex items-center dark:text-gray-300">
                                            <input type="checkbox" className="w-4 h-4 mr-2" />
                                            <span className="text-lg dark:text-gray-400">Apple</span>
                                        </label>
                                    </li>
                                    <li className="mb-4">
                                        <label htmlFor="" className="flex items-center dark:text-gray-300">
                                            <input type="checkbox" className="w-4 h-4 mr-2" />
                                            <span className="text-lg dark:text-gray-400">Oreo</span>
                                        </label>
                                    </li>
                                    <li className="mb-4">
                                        <label htmlFor="" className="flex items-center dark:text-gray-300">
                                            <input type="checkbox" className="w-4 h-4 mr-2" />
                                            <span className="text-lg dark:text-gray-400">Mango</span>
                                        </label>
                                    </li>
                                    <li className="mb-4">
                                        <label htmlFor="" className="flex items-center dark:text-gray-300">
                                            <input type="checkbox" className="w-4 h-4 mr-2" />
                                            <span className="text-lg dark:text-gray-400">Nebico</span>
                                        </label>
                                    </li>
                                </ul>
                                <a
                                    href="#"
                                    className="text-base font-medium text-blue-500 hover:underline dark:text-blue-400"
                                >
                                    View More
                                </a>
                            </div>
                            <div className="p-4 mb-5 bg-white border border-gray-200 dark:bg-gray-900 dark:border-gray-900">
                                <h2 className="text-2xl font-bold dark:text-gray-400">Tìm theo giá</h2>
                                <div className="w-16 pb-2 mb-6 border-b border-rose-600 dark:border-gray-400"></div>
                                <div>
                                    <input
                                        type="range"
                                        className="w-full h-1 mb-4 bg-blue-100 rounded appearance-none cursor-pointer"
                                        max={100}
                                    />
                                    <div className="flex justify-between ">
                                        <span className="inline-block text-lg font-bold text-blue-400 ">$1</span>
                                        <span className="inline-block text-lg font-bold text-blue-400 ">$500</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Products Block */}
                        <div className="w-full px-3 lg:w-3/4">
                            {/* Tasbar arrange select Block */}
                            <div className="px-3 mb-4">
                                <div className="items-center justify-between hidden px-3 py-2 bg-gray-100 md:flex dark:bg-gray-900 ">
                                    <div className="flex">
                                        <a
                                            href="#"
                                            className="inline-block h-full p-2 mr-3 border rounded-md bg-gray-50 dark:text-gray-400 dark:bg-gray-700 dark:border-gray-700"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                fill="currentColor"
                                                className="w-5 h-5 bi bi-list"
                                                viewBox="0 0 16 16"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                                                ></path>
                                            </svg>
                                        </a>
                                        <a
                                            href="#"
                                            className="inline-block h-full p-2 mr-3 border rounded-md bg-gray-50 dark:text-gray-400 dark:bg-gray-700 dark:border-gray-700"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                fill="currentColor"
                                                className="w-5 h-5 bi bi-grid-fill"
                                                viewBox="0 0 16 16"
                                            >
                                                <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zm8 0A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm-8 8A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm8 0A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3z"></path>
                                            </svg>
                                        </a>
                                        <a
                                            href="#"
                                            className="inline-block h-full p-2 mr-3 border rounded-md bg-gray-50 dark:text-gray-400 dark:bg-gray-700 dark:border-gray-700"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                fill="currentColor"
                                                className="w-5 h-5 bi bi-grid-3x3-gap-fill"
                                                viewBox="0 0 16 16"
                                            >
                                                <path d="M1 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V2zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V2zM1 7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V7zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V7zM1 12a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-2zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-2zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-2z"></path>
                                            </svg>
                                        </a>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="pr-3 border-r border-gray-300">
                                            <select
                                                name=""
                                                id=""
                                                className="block w-40 text-base bg-gray-100 cursor-pointer dark:text-gray-400 dark:bg-gray-900"
                                            >
                                                <option value="">Sort by latest</option>
                                                <option value="">Sort by Popularity</option>
                                                <option value="">Sort by Price</option>
                                            </select>
                                        </div>
                                        <div className="flex items-center pl-3">
                                            <p className="text-xs text-gray-400">Show</p>
                                            <div className="px-2 py-2 text-xs text-gray-500 ">
                                                <select
                                                    name=""
                                                    id=""
                                                    className="block text-base bg-gray-100 cursor-pointer w-11 dark:text-gray-400 dark:bg-gray-900"
                                                >
                                                    <option value="">15</option>
                                                    <option value="">17</option>
                                                    <option value="">19</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Product container */}
                            <div className="flex flex-wrap items-center ">
                                {/* Product Item */}

                                {productsApi.length === 0 ? (
                                    <h1>Không có sản phẩm nào</h1>
                                ) : (
                                    productsApi.map((product: IProduct) => {
                                        return <FilterItem key={product._id} product={product} />;
                                    })
                                )}
                            </div>

                            {/* Next Page Product */}
                            <div className="flex justify-end mt-6">
                                <nav aria-label="page-navigation">
                                    <ul className="flex list-style-none">
                                        <li className="page-item disabled ">
                                            <a
                                                href="#"
                                                className="relative block pointer-events-none px-3 py-1.5 mr-3 text-base text-gray-700 transition-all duration-300  rounded-md dark:text-gray-400 hover:text-gray-100 hover:bg-blue-600"
                                            >
                                                Previous
                                            </a>
                                        </li>
                                        <li className="page-item ">
                                            <a
                                                href="#"
                                                className="relative block px-3 py-1.5 mr-3 text-base hover:text-blue-700 transition-all duration-300 hover:bg-blue-200 dark:hover:text-gray-400 dark:hover:bg-gray-700 rounded-md text-gray-100 bg-blue-400"
                                            >
                                                1
                                            </a>
                                        </li>
                                        <li className="page-item ">
                                            <a
                                                href="#"
                                                className="relative block px-3 py-1.5 text-base text-gray-700 transition-all duration-300 dark:text-gray-400 dark:hover:bg-gray-700 hover:bg-blue-100 rounded-md mr-3  "
                                            >
                                                2
                                            </a>
                                        </li>
                                        <li className="page-item ">
                                            <a
                                                href="#"
                                                className="relative block px-3 py-1.5 text-base text-gray-700 transition-all duration-300 dark:text-gray-400 dark:hover:bg-gray-700 hover:bg-blue-100 rounded-md mr-3 "
                                            >
                                                3
                                            </a>
                                        </li>
                                        <li className="page-item ">
                                            <a
                                                href="#"
                                                className="relative block px-3 py-1.5 text-base text-gray-700 transition-all duration-300 dark:text-gray-400 dark:hover:bg-gray-700 hover:bg-blue-100 rounded-md "
                                            >
                                                Next
                                            </a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default FilterContainer;
