import {
    faHouse,
    faGear,
    faBoxArchive,
    faListUl,
    faArrowRightFromBracket,
    faTrashCan,
    faUser,
    faChartSimple,
    faSearch,
    faBell,
    faComment,
    faSliders,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Session } from 'next-auth';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import request from '@/utils/request';

type Props = {
    session: Session | null;
    status: any;
    signOut: any;
};

const Sidebar = (props: Props) => {
    const { session, signOut, status } = props;

    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const [orders, setOrders] = useState([]);
    const [trash, setTrash] = useState([]);

    const fetApi = async () => {
        const resP = await request.get('products');
        const resC = await request.get('categories');
        const resO = await request.get('orders');
        const resT = await request.get('products/deleteforce/trash');

        setProducts(resP.data);
        setCategory(resC.data);
        setOrders(resO.data);
        setTrash(resT.data);
    };

    useEffect(() => {
        fetApi();
    }, []);

    const router = useRouter();
    const styleLink =
        'flex items-center px-4 py-6 text-white justify-between dark:text-white hover:text-white hover:bg-primary dark:hover:bg-gray-700';
    const activeLink = 'flex bg-primary text-white' + styleLink;
    const { pathname } = router;
    const sessionAuth = session?.user;

    const [openSidebar, setOpenSidebar] = useState(true);

    const logout = async () => {
        signOut();
        router.push('/auth/signin');
    };

    const sidebarNavigation = [
        {
            title: 'Bảng điều khiển',
            icon: <FontAwesomeIcon icon={faChartSimple} />,
            path: '/admin',
        },
        {
            title: 'Sản phẩm',
            icon: <FontAwesomeIcon icon={faBoxArchive} />,
            statistical: products.length,
            path: '/admin/products',
        },
        {
            title: 'Đơn hàng',
            icon: <FontAwesomeIcon icon={faUser} />,
            statistical: orders.length,
            path: '/admin/orders',
        },
        {
            title: 'Loại hàng',
            icon: <FontAwesomeIcon icon={faListUl} />,
            statistical: category.length,
            path: '/admin/categories',
        },
        {
            title: 'Thùng rác',
            icon: <FontAwesomeIcon icon={faTrashCan} />,
            statistical: trash.length,
            path: '/admin/trash',
        },
        {
            title: 'Cài đặt',
            icon: <FontAwesomeIcon icon={faGear} />,
            path: '/admin/setting',
        },
    ];

    return (
        <>
            <div className="flex flex-no-wrap bg-[#1f2937]">
                {/* Sidebar starts */}
                <AnimatePresence>
                    {openSidebar && (
                        <>
                            <motion.div
                                initial={{ width: 0, opacity: 0 }}
                                animate={{ width: 256, opacity: 1 }}
                                transition={{ duration: 0.2, ease: 'easeInOut' }}
                                exit={{ width: 0, opacity: 0 }}
                                className="w-64 z-40 fixed top-0 bottom-0 bg-gray-800 shadow flex-col justify-between transition duration-150 ease-in-out"
                            >
                                <div>
                                    <div className="mt-6 w-full justify-center flex items-center">
                                        <img
                                            src={(sessionAuth?.image as string) || '/banner.png'}
                                            className="w-24 h-24 object-cover rounded-full"
                                            alt={(sessionAuth?.name as string) || 'Admin'}
                                        />
                                    </div>
                                    <ul className="mt-6">
                                        {sidebarNavigation.map((navigation, index) => (
                                            <Link
                                                key={index}
                                                href={`${navigation?.path}`}
                                                className={pathname === navigation.path ? activeLink : styleLink}
                                            >
                                                <div className="flex items-center">
                                                    {navigation.icon}
                                                    <span className="text-sm  ml-2">{navigation.title}</span>
                                                </div>
                                                {(navigation.statistical as number) >= 0 && (
                                                    <div className="py-1 px-3 w-8 h-6 bg-gray-700 rounded text-gray-50 flex items-center justify-center text-xs">
                                                        {navigation?.statistical}
                                                    </div>
                                                )}
                                            </Link>
                                        ))}

                                        <Link onClick={logout} href={''} className={styleLink}>
                                            <div className="flex items-center">
                                                <FontAwesomeIcon icon={faArrowRightFromBracket} />
                                                <span className="text-sm  ml-2">Đăng xuất</span>
                                            </div>
                                        </Link>
                                    </ul>
                                    <div className="flex justify-center mt-20 mb-4 w-full">
                                        <div className="relative ">
                                            <div className="text-gray-500 absolute ml-4 inset-0 m-auto w-4 h-4">
                                                <FontAwesomeIcon className="flex" icon={faSearch} />
                                            </div>
                                            <input
                                                className=" bg-gray-700 focus:outline-none rounded w-full text-sm text-gray-500 pl-10 py-2"
                                                type="text"
                                                placeholder="Search"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="px-8 border-t border-gray-700">
                                    <ul className="w-full flex items-center justify-between bg-gray-800">
                                        <li className="cursor-pointer text-white pt-5 pb-3">
                                            <FontAwesomeIcon icon={faBell} />
                                        </li>
                                        <li className="cursor-pointer text-white pt-5 pb-3">
                                            <FontAwesomeIcon icon={faComment} />
                                        </li>
                                        <li className="cursor-pointer text-white pt-5 pb-3">
                                            <FontAwesomeIcon icon={faGear} />
                                        </li>
                                    </ul>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
                {/* Mobile Menu */}

                <div
                    onClick={() => setOpenSidebar(!openSidebar)}
                    className="h-10 w-10 bg-gray-800 fixed z-30 top-0 right-8 mt-16 -mr-10 flex items-center shadow rounded-tr rounded-br justify-center cursor-pointer"
                >
                    <FontAwesomeIcon icon={faSliders} className="text-white" />
                </div>
                <AnimatePresence>
                    {openSidebar && (
                        <>
                            <motion.div
                                initial={{ width: 0, opacity: 0 }}
                                animate={{ width: 256, opacity: 1 }}
                                transition={{ duration: 0.2, ease: 'easeInOut' }}
                                exit={{ width: 0, opacity: 0 }}
                                className="w-64 z-40 fixed top-0 bottom-0 bg-gray-800 shadow flex-col justify-between sm:hidden transition duration-150 ease-in-out"
                                id="mobile-nav"
                            >
                                <div className="">
                                    <div className="mt-6 w-full justify-center flex items-center">
                                        <img
                                            src={sessionAuth?.image as string}
                                            className="w-24 h-24  rounded-full"
                                            alt={sessionAuth?.name as string}
                                        />
                                    </div>
                                    <ul className="mt-6">
                                        {sidebarNavigation.map((navigation, index) => (
                                            <Link
                                                key={index}
                                                href={`${navigation?.path}`}
                                                className={pathname === navigation.path ? activeLink : styleLink}
                                            >
                                                <div className="flex items-center">
                                                    {navigation.icon}
                                                    <span className="text-sm  ml-2">{navigation.title}</span>
                                                </div>
                                                {navigation.statistical && (
                                                    <div className="py-1 px-3 bg-gray-700 rounded text-gray-500 flex items-center justify-center text-xs">
                                                        {navigation?.statistical}
                                                    </div>
                                                )}
                                            </Link>
                                        ))}
                                    </ul>
                                    <div className="flex justify-center mt-20 mb-4 w-full">
                                        <div className="relative ">
                                            <div className="text-gray-500 absolute ml-4 inset-0 m-auto w-4 h-4">
                                                <FontAwesomeIcon className="flex" icon={faSearch} />
                                            </div>
                                            <input
                                                className=" bg-gray-700 focus:outline-none rounded w-full text-sm text-gray-500 pl-10 py-2"
                                                type="text"
                                                placeholder="Search"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="px-8 border-t border-gray-700">
                                    <ul className="w-full flex items-center justify-between bg-gray-800">
                                        <li className="cursor-pointer text-white pt-5 pb-3">
                                            <FontAwesomeIcon icon={faBell} />
                                        </li>
                                        <li className="cursor-pointer text-white pt-5 pb-3">
                                            <FontAwesomeIcon icon={faComment} />
                                        </li>
                                        <li className="cursor-pointer text-white pt-5 pb-3">
                                            <FontAwesomeIcon icon={faGear} />
                                        </li>
                                    </ul>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
};

export default Sidebar;
