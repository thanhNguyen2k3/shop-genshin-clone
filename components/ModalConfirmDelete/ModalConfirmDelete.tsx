import { faWarning } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { Dispatch, SetStateAction } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

type Props = {
    onClose: Dispatch<SetStateAction<boolean>>;
    handleDeleteForm: () => Promise<void>;
};

const ModalConfirmDelete = ({ onClose, handleDeleteForm }: Props) => {
    const router = useRouter();

    const wantDeleted = async () => {
        try {
            await handleDeleteForm();
            onClose(true);
            toast.warn('Bạn đã xóa sản phẩm này', { position: 'bottom-center' });
            router.push('');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                        <FontAwesomeIcon className="h-6 w-6 text-red-600" icon={faWarning} />
                                    </div>
                                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                        <h3
                                            className="text-base font-semibold leading-6 text-gray-900"
                                            id="modal-title"
                                        >
                                            Bạn muốn xóa nội dung sản phẩm này ?
                                        </h3>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row justify-end gap-2 sm:px-6">
                                <button
                                    onClick={wantDeleted}
                                    className="px-4 py-2 rounded border border-red-500 bg-red-500 text-white"
                                >
                                    Xóa bỏ
                                </button>
                                <button onClick={() => onClose(true)} className="px-4 py-2 rounded border bg-gray-300">
                                    Hủy
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalConfirmDelete;
