import axios from 'axios';
const request = axios.create({
    baseURL: `${process.env.NEXTAUTH_URL}/api/`,
});

export const get = async (path: string, option = {}) => {
    const response = await request.get(path, option);

    return response.data;
};

export default request;
