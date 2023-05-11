import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { SetStateAction } from 'react';
import { BeatLoader } from 'react-spinners';

type Props = {
    images: string[];
    isUploading: boolean;
    setImages: (value: SetStateAction<string[]>) => void;
    setIsUploading: (value: SetStateAction<boolean>) => void;
};

const ShowImagesUploaded = ({ images, setImages, isUploading }: Props) => {
    const removeImage = (index: any) => {
        setImages((prev) => [...prev.filter((value, i) => i !== index)]);
    };

    return (
        <div>
            {images.length === 0 ? (
                <h1>Bạn chưa đăng ảnh nào.</h1>
            ) : (
                <div className="grid grid-cols-4 gap-4 p-2 border">
                    {images.map((img, index) => (
                        <div key={index} className="relative">
                            <img src={img} alt="image" className="w-[200px] h-[200px] object-cover" />
                            <span onClick={() => removeImage(index)}>
                                <FontAwesomeIcon
                                    icon={faCircleXmark}
                                    className="text-primary text-2xl -top-1 -right-2 absolute cursor-pointer hover:text-red-500"
                                />
                            </span>
                            {isUploading && (
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2">
                                    <BeatLoader color="#36d7b7" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ShowImagesUploaded;
