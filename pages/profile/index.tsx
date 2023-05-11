import Layout from '@/layouts/Layout';
import Profile from '@/layouts/Profile';
import { useSession } from 'next-auth/react';

type Props = {};

const ProfilePage = (props: Props) => {
    const { data: session } = useSession();
    return (
        <Layout>
            <Profile
                session={session}
                name={session?.user?.name}
                image={session?.user?.image}
                email={session?.user?.email}
            />
        </Layout>
    );
};

export default ProfilePage;
