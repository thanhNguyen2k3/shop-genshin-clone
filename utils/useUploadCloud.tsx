import axios from 'axios';

export const useUploadCloud = async (file: any) => {
    const formData = new FormData();

    formData.append('file', file);
    formData.append('upload_preset', 'uploads');

    const { data } = await axios.post('https://api.cloudinary.com/v1_1/dkyhn68qq/image/upload', formData);

    return {
        data,
    };
};
