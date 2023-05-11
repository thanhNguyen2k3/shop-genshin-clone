import * as Yup from 'yup';

export const productSchema = Yup.object({
    name: Yup.string().min(3).required('Tên sản phẩm là bắt buộc'),
    description: Yup.string().min(3).required('Mô tả là bắt buộc'),
    shortDescription: Yup.string().required('Mô tả ngắn là bắt buộc'),
    images: Yup.array().of(Yup.string()).required('Ảnh là bắt buộc').required('Ảnh là bắt buộc'),
    category: Yup.string().required('Loại hàng là bắt buộc'),
    cost: Yup.number().min(1).required('Giá gốc sản phẩm phải lớn hơn 0'),
    price: Yup.number().min(1).required('Giá sản phẩm phải lớn hơn 0'),
});

export type ProductForm = Yup.InferType<typeof productSchema>;

export const categorySchema = Yup.object({
    title: Yup.string().required('Loại hàng là bắt buộc'),
    colors: Yup.array().of(Yup.string().min(1).required('Màu là bắt buộc')).required('Màu là bắt buộc'),
    sizes: Yup.array().of(Yup.string().required('Kích cỡ là bắt buộc')).required('Kích cỡ là bắt buộc'),
});

export type CategoryForm = Yup.InferType<typeof categorySchema>;

export const registerSchema = Yup.object({
    username: Yup.string().min(3).required('Tên người dùng là bắt buộc'),
    email: Yup.string().min(3).required('Email là bắt buộc'),
    password: Yup.string().min(3).required('mật khẩu là bắt buộc'),
});

export type registerForm = Yup.InferType<typeof registerSchema>;

export const chechoutDelivery = Yup.object({
    customer: Yup.string().min(3).required('Tên khách hàng là bắt buộc'),
    email: Yup.string().required('Email là bắt buộc'),
    phone: Yup.string().required('Số điện thoại là bắt buộc'),
    city: Yup.string().required('Tỉnh/Thành phố là bắt buộc'),
    address: Yup.string().required('Địa chỉ là bắt buộc'),
});

export type checkOutDeliveryForm = Yup.InferType<typeof chechoutDelivery>;
