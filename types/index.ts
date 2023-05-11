export interface IProduct {
    _id: string;
    name: string;
    description: string;
    shortDescription: string;
    images: string[];
    category: {
        categoryId: string;
        title: string;
        colors: string[];
        sizes: string[];
    };
    price: number;
    cost: number;
    slug: string;
    quantity: number;
    createdAt: string;
}

export interface ICategory {
    _id: string;
    title: string;
    colors: string[];
    sizes: string[];
}

export interface IOrder {
    _id: string;
    customer: string;
    address: string;
    city: string;
    email: string;
    phone: number;
    total: number;
    status: number;
    method: number;
    createdAt: string;
}

export interface ICart {
    products: any[];
    quantity: number;
    total: number;
}

export interface IDetaisCustomer {
    purchase_units: {
        shipping: {
            address: {
                address_line_1: string;
                address_line_2: string;
            };
            name: {
                full_name: string;
            };
            phone_number: {
                national_number: number;
            };
        };
    }[];
}
