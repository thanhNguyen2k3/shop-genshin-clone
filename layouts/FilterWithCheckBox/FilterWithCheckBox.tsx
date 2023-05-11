import { ICategory } from '@/types';

type Props = {
    categories: ICategory[];
};

const FilterWithCheckBox = ({ categories }: Props) => {
    return (
        <ul>
            {categories.map((category) => (
                <li key={category._id} className="mb-4">
                    <label htmlFor="" className="flex items-center dark:text-gray-400 ">
                        <input type="checkbox" className="w-4 h-4 mr-2" />
                        <span className="text-lg">{category.title}</span>
                    </label>
                </li>
            ))}
        </ul>
    );
};

export default FilterWithCheckBox;
