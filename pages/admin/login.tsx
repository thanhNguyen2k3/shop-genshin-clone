import request from '@/utils/request';
import { useRouter } from 'next/router';
import { useState } from 'react';

const CheckAdmin = () => {
    const router = useRouter();
    const [username, setAdminName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const handleSubmit = async () => {
        try {
            await request.post('login', {
                username,
                password,
            });

            router.push('/admin');
        } catch (error) {
            setError(error as any);
        }
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
                            value={username}
                            onChange={(e) => setAdminName(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            placeholder="admin Name"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Mật khẩu
                        </label>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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

                    {error && <span className="text-red-500 text-xl">Bạn không phải là Admin</span>}
                </form>
            </div>
        </div>
    );
};

export default CheckAdmin;
