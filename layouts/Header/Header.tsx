import { faCartShopping, faHeart, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Avatar, Dropdown, Navbar, Tooltip } from 'flowbite-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';

import SmallCart from '../SmallCart/SmallCart';
import Link from 'next/link';

import Search from '../Search';
import { motion, AnimatePresence } from 'framer-motion';

type Props = {};

const Header = () => {
    const quantity = useSelector((state: any) => state.cart.quantity);
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState(false);
    const [openSmallCart, setOpenSmallCart] = useState(false);

    // Check account

    const { data: session } = useSession();
    const IS_USER = true;

    return (
        <>
            <div className="fixed top-0 left-0 right-0 z-30 bg-white shadow-md shadow-slate-300/60">
                <section className=" font-poppins bg-teal-50 dark:bg-gray-800">
                    <div className="max-w-6xl px-4 mx-auto flex items-center">
                        <nav className="flex items-center justify-between py-4 flex-grow">
                            <a href="/" className="text-3xl font-semibold leading-none dark:text-gray-400">
                                <img src="/logo.png" className="w-24" />
                            </a>
                            <div className="flex lg:hidden">
                                <button className="inline-block px-4 py-3 mr-2 text-xs font-semibold leading-none text-teal-600 border border-teal-400 rounded dark:hover:text-teal-300 dark:text-gray-400 dark:border-gray-400 hover:text-teal-700 hover:border-teal-300">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        className="bi bi-search"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                    </svg>
                                </button>
                                {/* Bar icon */}
                                <button
                                    onClick={() => setOpen(true)}
                                    className="flex items-center px-3 py-2 text-teal-600 border border-teal-400 rounded dark:text-gray-400 hover:text-teal-800 hover:border-teal-300 dark:border-gray-400 lg:hidden"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        className="bi bi-list"
                                        viewBox="0 0 16 16"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                                        />
                                    </svg>
                                </button>
                            </div>

                            <ul className="hidden lg:w-auto lg:space-x-12 lg:items-center lg:flex ">
                                <li>
                                    <Link
                                        href="/filter"
                                        className="text-sm text-gray-700 hover:text-teal-700 dark:text-gray-400 dark:hover:text-teal-300"
                                    >
                                        Cửa hàng
                                    </Link>
                                </li>
                                <li>
                                    <a
                                        href=""
                                        className="text-sm text-gray-700 hover:text-teal-700 dark:text-gray-400 dark:hover:text-teal-300"
                                    >
                                        About us
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href=""
                                        className="text-sm text-gray-700 hover:text-teal-700 dark:text-gray-400 dark:hover:text-teal-300"
                                    >
                                        Features
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href=""
                                        className="text-sm text-gray-700 hover:text-teal-700 dark:text-gray-400 dark:hover:text-teal-300"
                                    >
                                        Blog{' '}
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href=""
                                        className="text-sm text-gray-700 hover:text-teal-700 dark:text-gray-400 dark:hover:text-teal-300"
                                    >
                                        Testimonials
                                    </a>
                                </li>
                            </ul>
                            <div className="hidden lg:flex">
                                {/* Cart icon */}
                                <Tooltip content="Giỏ hàng của bạn" placement="bottom">
                                    <button
                                        onClick={() => setOpenSmallCart(true)}
                                        className="relative inline-block px-4 py-3 mr-4 text-xs font-semibold leading-none text-teal-500 border border-teal-300 rounded dark:hover:text-teal-300 dark:text-gray-400 dark:border-gray-400 hover:text-teal-700 hover:border-teal-500 dark:hover:border-teal-300"
                                    >
                                        <FontAwesomeIcon icon={faCartShopping} className="text-base" />
                                        <span
                                            className="
                                             absolute -top-2 text-sm -right-4 text-white
                                         bg-primary w-5 h-5 flex justify-center items-center rounded-full"
                                        >
                                            {quantity}
                                        </span>
                                    </button>
                                </Tooltip>
                                <button
                                    onClick={() => setSearch(!search)}
                                    className="relative inline-block px-4 py-3 mr-4 text-xs font-semibold leading-none text-teal-500 border border-teal-300 rounded dark:hover:text-teal-300 dark:text-gray-400 dark:border-gray-400 hover:text-teal-700 hover:border-teal-500 dark:hover:border-teal-300"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        className="bi bi-search"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                    </svg>
                                </button>

                                {<Search search={search} setSearch={setSearch} />}
                            </div>
                        </nav>
                        {session ? (
                            <Dropdown
                                arrowIcon={false}
                                inline={true}
                                label={
                                    <Avatar
                                        className="ml-3"
                                        alt="User settings"
                                        img={session.user?.image as string}
                                        rounded={true}
                                    />
                                }
                            >
                                <Dropdown.Header>
                                    <span className="block text-sm">{session.user?.name}</span>
                                    <span className="block truncate text-sm font-medium">{session.user?.email}</span>
                                </Dropdown.Header>
                                <Dropdown.Item>
                                    <Link href={'/profile'}>Thông tin cá nhân</Link>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    <Link href={'/cart'}>Giỏ hàng</Link>
                                </Dropdown.Item>
                                <Dropdown.Item>Cài đặt</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item onClick={() => signOut()}>Đăng xuất</Dropdown.Item>
                            </Dropdown>
                        ) : (
                            <Link
                                href="/login"
                                className="inline-block px-4 py-3 ml-3 text-sm font-semibold leading-none text-gray-100 bg-teal-600 border border-teal-200 rounded dark:hover:border-teal-400 dark:hover:bg-teal-400 dark:border-teal-300 dark:bg-teal-300 dark:text-gray-700 hover:bg-teal-700"
                            >
                                Đăng nhập
                            </Link>
                        )}
                        {/* <!-- Mobile Sidebar --> */}

                        <AnimatePresence>
                            {open && (
                                <>
                                    <div className="fixed inset-0 w-full bg-gray-800 opacity-25 dark:bg-gray-400 lg:hidden"></div>
                                    <motion.div
                                        initial={{ width: 0, opacity: 0 }}
                                        transition={{ ease: 'easeInOut', duration: 0.2 }}
                                        animate={{ width: '320px', opacity: 1 }}
                                        exit={{ width: 0, opacity: 0 }}
                                        className="absolute inset-0 z-10 h-screen p-3 text-gray-700 transform shadow-md dark:bg-gray-800 bg-teal-50 w-80 lg:hidden lg:transform-none lg:relative"
                                    >
                                        <div className="flex justify-between px-5 py-2">
                                            <a className="text-2xl font-bold dark:text-gray-400" href="/">
                                                <img src="/logo.png" alt="" className="w-24" />
                                            </a>
                                            <button
                                                onClick={() => setOpen(false)}
                                                className="rounded-md hover:text-teal-300 lg:hidden dark:text-gray-400"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="24"
                                                    height="24"
                                                    fill="currentColor"
                                                    className="bi bi-x-circle"
                                                    viewBox="0 0 16 16"
                                                >
                                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                                </svg>
                                            </button>
                                        </div>

                                        <ul className="px-5 text-left mt-7">
                                            <li className="pb-3">
                                                <a
                                                    href=""
                                                    className="text-sm text-gray-700 hover:text-teal-400 dark:text-gray-100"
                                                >
                                                    Home
                                                </a>
                                            </li>
                                            <li className="pb-3">
                                                <a
                                                    href=""
                                                    className="text-sm text-gray-700 hover:text-teal-400 dark:text-gray-400"
                                                >
                                                    About us
                                                </a>
                                            </li>
                                            <li className="pb-3">
                                                <a
                                                    href=""
                                                    className="text-sm text-gray-700 hover:text-teal-400 dark:text-gray-400"
                                                >
                                                    Features
                                                </a>
                                            </li>
                                            <li className="pb-3">
                                                <a
                                                    href=""
                                                    className="text-sm text-gray-700 hover:text-teal-400 dark:text-gray-400"
                                                >
                                                    Blog{' '}
                                                </a>
                                            </li>
                                            <li className="pb-3">
                                                <a
                                                    href=""
                                                    className="text-sm text-gray-700 hover:text-teal-400 dark:text-gray-400"
                                                >
                                                    Testimonials
                                                </a>
                                            </li>
                                        </ul>
                                        <div className="px-4 mt-7 lg:hidden">
                                            <a
                                                href=""
                                                className="inline-block w-full py-3 mr-2 text-xs font-medium leading-none text-center text-gray-100 bg-teal-600 border border-teal-200 rounded px-7 dark:hover:border-teal-400 dark:hover:bg-teal-400 dark:border-teal-300 dark:bg-teal-300 dark:text-gray-700 hover:bg-teal-700"
                                            >
                                                Try it free!
                                            </a>
                                        </div>
                                    </motion.div>
                                </>
                            )}
                        </AnimatePresence>
                    </div>
                </section>
            </div>

            {openSmallCart && <SmallCart open={openSmallCart} setOpen={setOpenSmallCart} />}
        </>
        // <div className="fixed top-0 left-0 right-0 z-30 bg-white shadow-md shadow-slate-300/60">
        //     <Navbar fluid={true} rounded={false} className=" w-layout m-auto ">
        //         <Navbar.Brand href="/">
        //             <img src="/logo.png" className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
        //         </Navbar.Brand>
        //         <div className="flex md:order-2">
        //             {session ? (
        //                 <Dropdown
        //                     arrowIcon={false}
        //                     inline={true}
        //                     label={
        //                         <Avatar
        //                             className="mr-4"
        //                             alt="User settings"
        //                             img={session.user?.image as string}
        //                             rounded={true}
        //                         />
        //                     }
        //                 >
        //                     <Dropdown.Header>
        //                         <span className="block text-sm">{session.user?.name}</span>
        //                         <span className="block truncate text-sm font-medium">{session.user?.email}</span>
        //                     </Dropdown.Header>
        //                     <Dropdown.Item>
        //                         <Link href={'/profile'}>Thông tin cá nhân</Link>
        //                     </Dropdown.Item>
        //                     <Dropdown.Item>
        //                         <Link href={'/cart'}>Giỏ hàng</Link>
        //                     </Dropdown.Item>
        //                     <Dropdown.Item>Cài đặt</Dropdown.Item>
        //                     <Dropdown.Divider />
        //                     <Dropdown.Item onClick={() => signOut()}>Đăng xuất</Dropdown.Item>
        //                 </Dropdown>
        //             ) : (
        //                 <Link
        //                     href="/login"
        //                     className="hover:bg-secondDary mr-2 text-white bg-primary px-4 py-2 rounded-sm"
        //                 >
        //                     Đăng nhập
        //                 </Link>
        //             )}
        //             <Navbar.Toggle />
        //         </div>
        //         <Navbar.Collapse>
        //             <Navbar.Link href="/navbars">Cửa hàng</Navbar.Link>
        //             <Navbar.Link href="/navbars">Services</Navbar.Link>
        //             <Navbar.Link href="/navbars">Pricing</Navbar.Link>
        //             <Navbar.Link href="/navbars">Contact</Navbar.Link>
        //             <Tooltip content="Danh sách yêu thích" placement="bottom">
        //                 <Navbar.Link className="text-lg hover:text-primary uppercase text-gray-500" href="/navbars">
        //                     <FontAwesomeIcon icon={faHeart} />
        //                 </Navbar.Link>
        //             </Tooltip>
        //             <Navbar.Link>
        //                 <Tooltip content="Giỏ hàng của bạn" placement="bottom">
        //                     <button
        //                         onClick={() => setOpen(true)}
        //                         className="text-lg relative hover:text-primary uppercase"
        //                     >
        //                         <FontAwesomeIcon icon={faCartShopping} />
        //                         <span
        //                             className="
        //                                      absolute -top-2 text-sm -right-4 text-white
        //                                  bg-primary w-5 h-5 flex justify-center items-center rounded-full"
        //                         >
        //                             {quantity}
        //                         </span>
        //                     </button>
        //                 </Tooltip>
        //             </Navbar.Link>

        //             <Search search={search} setSearch={setSearch} />

        //             <button
        //                 onClick={() => setSearch(!search)}
        //                 className="hover:text-secondDary w-full items-center justify-center px-5 rounded-sm"
        //             >
        //                 <FontAwesomeIcon className="text-base" icon={faSearch} />
        //             </button>
        //         </Navbar.Collapse>
        //     </Navbar>

        //     {open && <SmallCart open={open} setOpen={setOpen} />}
        // </div>
    );
};

export default Header;
