import Header from '../Header/Header';
import FooterLayout from '../Footer/Footer';

type Props = {
    children: JSX.Element;
};

const Layout = ({ children }: Props) => {
    return (
        <>
            <Header />
            <div className="m-auto">{children}</div>
            <FooterLayout />
        </>
    );
};

export default Layout;
