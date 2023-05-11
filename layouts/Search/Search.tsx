import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useEffect, useRef, useState } from 'react';
import { faCircleXmark, faSearch, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion, AnimatePresence } from 'framer-motion';
import Tippy from '@tippyjs/react/headless';
import { useRouter } from 'next/navigation';

import * as services from '@/apiServices/services';
import SearchResultItem from '../SearchResultItem';
import { useDebounce } from '@/hooks';
import { IProduct } from '@/types';

type Props = {
    search: boolean;
    setSearch: Dispatch<SetStateAction<boolean>>;
};

const Search = ({ search, setSearch }: Props) => {
    const router = useRouter();
    const inputRef = useRef<any>(null);

    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState<IProduct[]>([]);
    const [showResult, setShowResult] = useState(true);
    const [loading, setLoading] = useState(false);

    const encodedSearchQuery = encodeURI(searchValue);
    const debounce = useDebounce(encodedSearchQuery, 800);

    const handleChange = (e: ChangeEvent<any>) => {
        const searchValue = e.target.value;

        setSearchValue(searchValue);
    };

    const handleClearValue = () => {
        setSearchValue('');
        setSearchResult([]);
        inputRef.current.focus();
    };

    const handleHideResult = () => {
        setShowResult(false);
    };

    const handleSearch = (event: FormEvent) => {
        event.preventDefault();

        router.push(`/search?q=${encodedSearchQuery}`);
        console.log('query is: ', encodedSearchQuery);
    };

    useEffect(() => {
        if (!debounce.trim()) {
            setSearchResult([]);
            return;
        }

        const fetchApi = async () => {
            setLoading(true);

            const result = await services.search(debounce);

            setSearchResult(result);
            setLoading(false);
        };

        fetchApi();
    }, [debounce]);

    return (
        <>
            <AnimatePresence>
                {search && (
                    <motion.div
                        key="box"
                        initial={{ width: 360, opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        exit={{ opacity: 0 }}
                        className={`absolute z-10 top-2 right-1/3 `}
                    >
                        <Tippy
                            interactive
                            visible={showResult && searchResult.length > 0}
                            render={(attrs) => (
                                <div
                                    className="w-[360px] bg-white rounded-sm shadow-sm shadow-gray-500"
                                    tabIndex={-1}
                                    {...attrs}
                                >
                                    <div className="py-3 text-sm">
                                        {searchResult.map((product) => (
                                            <SearchResultItem key={product._id} data={product} />
                                        ))}
                                    </div>
                                </div>
                            )}
                            onClickOutside={handleHideResult}
                        >
                            <form onSubmit={handleSearch}>
                                <label
                                    htmlFor="default-search"
                                    className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                                >
                                    Search
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <FontAwesomeIcon
                                            className="w-5 h-5 text-gray-500 dark:text-gray-400"
                                            icon={faSearch}
                                        />
                                    </div>
                                    <input
                                        type="search"
                                        id="default-search"
                                        className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
                                        placeholder="Search Mockups, Logos..."
                                        required
                                        ref={inputRef}
                                        value={searchValue}
                                        onChange={handleChange}
                                        onFocus={() => setShowResult(true)}
                                    />

                                    {!!searchValue && !loading && (
                                        <div
                                            onClick={handleClearValue}
                                            className="absolute inset-y-0 right-24 flex items-center pl-3 cursor-pointer"
                                        >
                                            <FontAwesomeIcon
                                                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                                                icon={faCircleXmark}
                                            />
                                        </div>
                                    )}
                                    {loading && (
                                        <div className="absolute inset-y-0 right-24 flex items-center pl-3 cursor-pointer">
                                            <FontAwesomeIcon
                                                className="animate-spin w-5 h-5 text-gray-500 dark:text-gray-400"
                                                icon={faSpinner}
                                            />
                                        </div>
                                    )}
                                    <button
                                        type="submit"
                                        className="text-white absolute right-2.5 bottom-2.5 bg-primary hover:bg-secondDary focus:ring-4 focus:outline-none focus:ring-primary font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary dark:hover:bg-primary dark:focus:ring-primary"
                                    >
                                        Search
                                    </button>
                                </div>
                            </form>
                        </Tippy>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Search;
