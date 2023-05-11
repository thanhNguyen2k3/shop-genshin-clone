import { NextPage } from 'next';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

import { FormEventHandler, useState } from 'react';

type Props = {};

const SignIn: NextPage = (props: Props): JSX.Element => {
    const router = useRouter();
    const [userInfo, setUserInfo] = useState({ email: '', password: '' });

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();

        const res = await signIn('credentials', {
            email: userInfo.email,
            password: userInfo.password,
            image: 'https://i.redd.it/yrpxo2ro8og91.png',
            redirect: false,
        });

        router.push('/admin');
    };

    return (
        <div className="bg-banner flex bg-background/30 h-screen w-screen justify-center items-center">
            <div className="w-full max-w-xs">
                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 z-10 relative">
                    <h1 className="block text-xl text-primary mb-4">Đăng nhập bằng quyền quản trị Admin</h1>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Username
                        </label>
                        <input
                            value={userInfo.email}
                            onChange={({ target }) => setUserInfo({ ...userInfo, email: target.value })}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            placeholder="Email"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Mật khẩu
                        </label>
                        <input
                            value={userInfo.password}
                            onChange={({ target }) => setUserInfo({ ...userInfo, password: target.value })}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            type="password"
                            placeholder="Mật khẩu"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button className="bg-primary hover:opacity-90 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Đăng nhập
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignIn;
