import { IProduct } from '@/types';
import Link from 'next/link';

type Props = {
    data: IProduct;
};

const SearchResultItem = ({ data }: Props) => {
    return (
        <Link
            href={`/merch/${data.slug}/${data._id}`}
            className="flex justify-start cursor-pointer text-gray-700 hover:text-blue-400 hover:bg-blue-100 rounded-md px-2 py-2 "
        >
            <img src={data.images[0]} className="w-12 h-12 rounded-sm" alt="" />
            <div className="flex-grow px-2">
                <p className="font-medium">{data.name}</p>
                <p>Đồ gia dụng</p>
            </div>
        </Link>
    );
};

export default SearchResultItem;
