import axios from 'axios';
const request = axios.create({
    baseURL: 'http://localhost:3000/api/',
});

export const get = async (path: string, option = {}) => {
    const response = await request.get(path, option);

    return response.data;
};

export default request;
