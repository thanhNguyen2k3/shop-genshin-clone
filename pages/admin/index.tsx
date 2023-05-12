import Layout from '@/components/Layout';
import { GetServerSideProps } from 'next';

export default function Home() {
    return (
        <Layout>
            <div>Test</div>
        </Layout>
    );
}

export const getServerSideProps: GetServerSideProps = async (context: any) => {
    const myCookie = context.req?.cookies || '';

    if (myCookie.token !== process.env.TOKEN) {
        return {
            redirect: {
                destination: '/admin/login',
                permanent: false,
            },
        };
    }

    return {
        props: myCookie || null,
    };
};
