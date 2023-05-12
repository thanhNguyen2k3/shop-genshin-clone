import { useSession, signOut } from 'next-auth/react';
import Sidebar from '@/components/Sidebar';
import Router from 'next/router';
import { GetServerSideProps } from 'next';
import request from '@/utils/request';

type Props = {
    children: JSX.Element;
};

function Layout({ children }: Props) {
    const { status, data: session } = useSession();

    return (
        <div className="flex flex-1 max-w-full">
            <Sidebar session={session} status={status} signOut={signOut} />
            <div className="flex-grow py-4 px-4 max-w-full">{children}</div>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const res = await request.get('products');
    const orders = await request.get('orders');
    const trash = await request.get('products/deleteforce/trash');
    const category = await request.get('categories');

    return {
        props: {
            products: res.data,
            orders: orders.data,
            trash: trash.data,
            category: category.data,
        },
    };
};

export default Layout;
