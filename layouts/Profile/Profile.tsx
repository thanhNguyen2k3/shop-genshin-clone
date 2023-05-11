import { Session } from 'next-auth';
import Link from 'next/link';
import React from 'react';

type Props = {
    image: string | null | undefined;
    name: string | null | undefined;
    email: string | null | undefined;
    session: Session | null;
};

const Profile = ({ image, name, email, session }: Props) => {
    if (!session) {
        return (
            <div className="mt-20 min-h-[300px]">
                <h1 className="text-center">
                    Bạn chưa đăng nhập. Vui lòng
                    <Link className="hover:underline text-primary" href={'/login'}>
                        {' '}
                        Đăng nhập
                    </Link>
                </h1>
            </div>
        );
    }

    return (
        <div>
            <section className="relative block h-500-px">
                <div
                    className="absolute top-0 w-full h-full bg-center bg-cover"
                    style={{
                        backgroundImage: `url('${image}')`,
                    }}
                >
                    <span id="blackOverlay" className="w-full h-full absolute opacity-50 bg-black"></span>
                </div>
                <div className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px">
                    <svg
                        className="absolute bottom-0 overflow-hidden"
                        xmlns="http://www.w3.org/2000/svg"
                        preserveAspectRatio="none"
                        version="1.1"
                        viewBox="0 0 2560 100"
                        x="0"
                        y="0"
                    >
                        <polygon className="text-blueGray-200 fill-current" points="2560 0 2560 100 0 100"></polygon>
                    </svg>
                </div>
            </section>
            <section className="relative py-16 bg-blueGray-200">
                <div className="container w-layout mx-auto px-4">
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg">
                        <div className="px-6">
                            <div className="flex flex-wrap justify-center">
                                <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                                    <div className="relative">
                                        <img
                                            alt="..."
                                            src={image as string}
                                            className="w-24 h-24 shadow-xl rounded-full align-middle border-none"
                                        />
                                    </div>
                                </div>
                                <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                                    <div className="py-6 px-3 mt-32 sm:mt-0">
                                        <button
                                            className="bg-primary active:bg-secondDary uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                        >
                                            Cập nhật thông tin
                                        </button>
                                    </div>
                                </div>
                                <div className="w-full lg:w-4/12 px-4 lg:order-1">
                                    <div className="flex justify-center py-4 lg:pt-4 pt-8">
                                        <div className="mr-4 p-3 text-center">
                                            <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                                                22
                                            </span>
                                            <span className="text-sm text-blueGray-400">Friends</span>
                                        </div>
                                        <div className="mr-4 p-3 text-center">
                                            <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                                                10
                                            </span>
                                            <span className="text-sm text-blueGray-400">Photos</span>
                                        </div>
                                        <div className="lg:mr-4 p-3 text-center">
                                            <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                                                89
                                            </span>
                                            <span className="text-sm text-blueGray-400">Comments</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center mt-12">
                                <h3 className="text-4xl font-semibold leading-normal text-blueGray-700 mb-2">{name}</h3>
                                <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                                    <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                                    {email}
                                </div>
                                <div className="mb-2 text-blueGray-600 mt-10">
                                    <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>Solution Manager
                                    - Creative Tim Officer
                                </div>
                                <div className="mb-2 text-blueGray-600">
                                    <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>University of
                                    Computer Science
                                </div>
                            </div>
                            <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                                <div className="flex flex-wrap justify-center">
                                    <div className="w-full lg:w-9/12 px-4">
                                        <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                                            Là một nghệ sĩ có tầm cỡ đáng kể, Jenna là cái tên do Nick Murphy sinh ra ở
                                            Brooklyn, lớn lên ở Melbourne, viết, biểu diễn và ghi âm tất cả các bản nhạc
                                            của chính mình, mang lại cảm giác ấm áp, gần gũi với cấu trúc đường rãnh
                                            chắc chắn. Một nghệ sĩ có phạm vi đáng kể.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Profile;
