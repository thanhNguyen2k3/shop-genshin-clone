import { IProduct } from '@/types';
import CardItem from '../CardItem';

type Props = {
    products: IProduct[];
};

const CartList = ({ products }: Props) => {
    return (
        <>
            <section className="flex items-center bg-gray-100 dark:bg-gray-800">
                <div className="p-4 mx-auto max-w-7xl">
                    <div className="grid grid-cols-1 gap-4 lg:gap-4 sm:gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {products && products.map((product) => <CardItem key={product._id} product={product} />)}
                    </div>
                </div>
            </section>
        </>
    );
};

export default CartList;
