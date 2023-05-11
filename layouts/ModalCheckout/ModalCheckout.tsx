import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';
import { yupResolver } from '@hookform/resolvers/yup';
import { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import { Modal } from 'flowbite-react';
import { Session } from 'next-auth';
import { chechoutDelivery, checkOutDeliveryForm } from '@/validate';

type Props = {
    open: boolean;
    setOpenDelivery: Dispatch<SetStateAction<boolean>>;
    createOrder: (data: any) => Promise<void>;
    total: number;
    session: Session | null;
};

const optionCity = [
    'An Giang',
    'Bà Rịa , - Vũng Tàu',
    'Bắc Giang',
    'Bắc Kạn',
    'Bạc Liêu',
    'Bắc Ninh',
    'Bến Tre',
    'Bình Định',
    'Bình Dương',
    'Bình Phước',
    'Bình Thuận',
    'Bình Thuận',
    'Cà Mau',
    'Cao Bằng',
    'Đắk Lắk',
    'Đắk Nông',
    'Điện Biên',
    'Đồng Nai',
    'Đồng Tháp',
    'Đồng Tháp',
    'Gia Lai',
    'Hà Giang',
    'Hà Nam',
    'Hà Tĩnh',
    'Hải Dương',
    'Hậu Giang',
    'Hòa Bình',
    'Hưng Yên',
    'Khánh Hòa',
    'Kiên Giang',
    'Kon Tum',
    'Lai Châu',
    'Lâm Đồng',
    'Lạng Sơn',
    'Lào Cai',
    'Long An',
    'Nam Định',
    'Nghệ An',
    'Ninh Bình',
    'Ninh Thuận',
    'Phú Thọ',
    'Quảng Bình',
    'Quảng Bình',
    'Quảng Ngãi',
    'Quảng Ninh',
    'Quảng Trị',
    'Sóc Trăng',
    'Sơn La',
    'Tây Ninh',
    'Thái Bình',
    'Thái Nguyên',
    'Thanh Hóa',
    'Thừa Thiên Huế',
    'Tiền Giang',
    'Trà Vinh',
    'Tuyên Quang',
    'Vĩnh Long',
    'Vĩnh Phúc',
    'Yên Bái',
    'Phú Yên',
    'Tp.Cần Thơ',
    'Tp.Đà Nẵng',
    'Tp.Hải Phòng',
    'Tp.Hà Nội',
    'TP.HCM',
];

const ModalCheckout = ({ open, setOpenDelivery, createOrder, total, session }: Props) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<checkOutDeliveryForm>({
        resolver: yupResolver(chechoutDelivery),
        defaultValues: {
            customer: '',
            email: session?.user?.email as string,
            phone: '',
            city: '',
            address: '',
        },
    });

    const submitOder = async (data: checkOutDeliveryForm) => {
        try {
            const res = await createOrder({
                ...data,
                total,
                method: 0,
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <AnimatePresence>
            {open && (
                <Modal show={true} className="h-screen dark:bg-gray-800">
                    <Modal.Body className="mt-32">
                        <motion.section
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ y: 100 }}
                            className=" dark:bg-gray-800"
                        >
                            <form className="max-w-6xl px-4 mx-auto" onSubmit={handleSubmit(submitOder)}>
                                <div className="rounded-lg shadow bg-gray-50 dark:bg-gray-900 dark:border-gray-900">
                                    <div className="p-6 ">
                                        <div className="relative pb-6 border-b border-gray-100 dark:border-gray-800 ">
                                            <h2 className="text-xl font-bold text-gray-800 md:text-3xl dark:text-gray-300">
                                                Phương thức thanh toán
                                            </h2>
                                            <button
                                                onClick={() => setOpenDelivery(false)}
                                                className="absolute p-3 -top-6 right-0"
                                            >
                                                <FontAwesomeIcon icon={faXmark} className="text-xl" />
                                            </button>
                                        </div>
                                        <div className="py-6 border-b border-gray-100 dark:border-gray-800">
                                            <div className="w-full md:w-10/12">
                                                <div className="flex flex-wrap -m-3 ">
                                                    <div className="w-full p-3 md:w-1/3">
                                                        <p className="text-base font-semibold text-gray-700 dark:text-gray-400">
                                                            Tên khách hàng
                                                        </p>
                                                    </div>
                                                    <div className="w-full p-3 md:w-1/3 flex-grow">
                                                        <input
                                                            className="w-full dark:bg-gray-800 dark:border-gray-800 px-4 dark:placeholder-gray-500 dark:text-gray-400 py-2.5 text-base text-gray-900 rounded-lg font-normal border border-gray-200"
                                                            type="text"
                                                            placeholder="Nguyễn Văn A"
                                                            {...register('customer')}
                                                        />
                                                        <p className="text-red-500 tetx-sm mb-2">
                                                            {errors.customer?.message}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="py-6 border-b border-gray-100 dark:border-gray-800 ">
                                            <div className="w-full md:w-10/12">
                                                <div className="flex flex-wrap -m-3">
                                                    <div className="w-full p-3 md:w-1/3">
                                                        <p className="text-sm font-semibold text-gray-800 dark:text-gray-400">
                                                            Địa chỉ Email
                                                        </p>
                                                    </div>
                                                    <div className="w-full p-3 md:flex-1">
                                                        <input
                                                            className="w-full px-4 py-2.5 dark:bg-gray-800 dark:border-gray-800 dark:placeholder-gray-500 dark:text-gray-400  text-base text-gray-900 rounded-lg font-normal border border-gray-200"
                                                            type="email"
                                                            placeholder="adam@gmail.com"
                                                            {...register('email')}
                                                        />
                                                        <p className="text-red-500 tetx-sm mb-2">
                                                            {errors.email?.message}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="py-6 border-b border-gray-100 dark:border-gray-800 ">
                                            <div className="w-full md:w-10/12">
                                                <div className="flex flex-wrap -m-3">
                                                    <div className="w-full p-3 md:w-1/3">
                                                        <p className="text-sm font-semibold text-gray-800 dark:text-gray-400">
                                                            Số điện thoại
                                                        </p>
                                                    </div>
                                                    <div className="w-full p-3 md:flex-1">
                                                        <input
                                                            className="w-full px-4 py-2.5 dark:bg-gray-800 dark:border-gray-800 dark:placeholder-gray-500 dark:text-gray-400  text-base text-gray-900 rounded-lg font-normal border border-gray-200"
                                                            type="number"
                                                            placeholder="032345..."
                                                            {...register('phone')}
                                                        />
                                                        <p className="text-red-500 tetx-sm mb-2">
                                                            {errors.phone?.message}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="py-6 border-b border-gray-100 dark:border-gray-800 ">
                                            <div className="w-full md:w-10/12">
                                                <div className="flex flex-wrap -m-3">
                                                    <div className="w-full p-3 md:w-1/3">
                                                        <p className="text-sm font-semibold text-gray-800 dark:text-gray-400">
                                                            Tỉnh/Thành phố
                                                        </p>
                                                    </div>
                                                    <div className="w-full p-3 md:flex-1">
                                                        <select
                                                            {...register('city')}
                                                            className="border border-gray-200 rounded-md"
                                                        >
                                                            <option value="">-- Tỉnh/ thành phố --</option>
                                                            {optionCity.map((city, index) => (
                                                                <option value={city} key={index}>
                                                                    {city}
                                                                </option>
                                                            ))}
                                                        </select>
                                                        <p className="text-red-500 tetx-sm mb-2">
                                                            {errors.city?.message}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="py-6 border-b border-gray-100 dark:border-gray-800 ">
                                            <div className="w-full md:w-10/12">
                                                <div className="flex flex-wrap -m-3">
                                                    <div className="w-full p-3 md:w-1/3">
                                                        <p className="text-sm font-semibold text-gray-800 dark:text-gray-400">
                                                            Địa chỉ giao hàng
                                                        </p>
                                                    </div>
                                                    <div className="w-full p-3 md:flex-1">
                                                        <input
                                                            className="w-full px-4 py-2.5 dark:bg-gray-800 dark:border-gray-800 dark:placeholder-gray-500 dark:text-gray-400  text-base text-gray-900 rounded-lg font-normal border border-gray-200"
                                                            type="text"
                                                            placeholder="Vui lòng ghi rõ địa chỉ..."
                                                            {...register('address')}
                                                        />
                                                        <p className="text-red-500 tetx-sm mb-2">
                                                            {errors.address?.message}
                                                        </p>

                                                        <p className="text-gray-500 text-sm my-2">
                                                            Ví dụ: Tỉnh lẻ - (Thôn, Xã , Huyện, Tỉnh)
                                                        </p>
                                                        <p className="text-gray-500 text-sm">
                                                            Ví dụ: Thành phố - (Số nhà, Đường , Quận, Thành phố)
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-full md:w-10/12">
                                            <div className="flex flex-wrap justify-end -m-1.5">
                                                <div className="w-full md:w-auto p-1.5">
                                                    <button
                                                        onClick={() => setOpenDelivery(false)}
                                                        type="button"
                                                        className="flex flex-wrap justify-center w-full px-4 py-2 text-sm font-medium text-primary bg-white border border-primary rounded-md dark:text-gray-300 dark:bg-gray-700 dark:hover:bg-gray-800 dark:border-gray-700 hover:bg-primary/10 "
                                                    >
                                                        <p>Hủy</p>
                                                    </button>
                                                </div>
                                                <div className="w-full md:w-auto p-1.5">
                                                    <button className="flex flex-wrap justify-center w-full px-4 py-2 text-sm font-medium text-white bg-primary border border-primary rounded-md hover:bg-secondDary ">
                                                        <p>Gửi</p>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </motion.section>
                    </Modal.Body>
                </Modal>
            )}
        </AnimatePresence>
    );
};

export default ModalCheckout;
