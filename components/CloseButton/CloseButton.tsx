import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Dispatch, SetStateAction } from 'react';

type Props = {
    setOpen: Dispatch<SetStateAction<boolean>>;
    children: JSX.Element;
};

const CloseButton = ({ setOpen, children }: Props) => {
    return (
        <div>
            <div className="text-right">
                <button
                    onClick={() => setOpen(false)}
                    className="text-gray-700 p-4 right-10 top-6 hover:bg-primary hover:text-white rounded-sm absolute dark:text-gray-400"
                >
                    {children}
                </button>
            </div>
        </div>
    );
};

export default CloseButton;
