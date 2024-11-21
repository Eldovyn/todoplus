import React, { useState } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const Modal: React.FunctionComponent<ModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const [title, setTitle] = useState('');
    const [titleError, setTitleError] = useState(false);

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg w-1/3">
                <div className="border-b p-4 flex justify-between items-center">
                    <h5 className="text-lg font-bold">Modal title</h5>
                    <button onClick={onClose} className="text-black">&times;</button>
                </div>
                <div className="p-4">
                <input
                        type={"text"}
                        id="exampleInputPassword"
                        className={`mt-1 block w-full px-3 py-2 border ${titleError ? "focus:ring-red-500 focus:border-red-500 border-red-500" : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"} rounded-md shadow-sm focus:outline-none focus:ring-2 sm:text-sm text-black`}
                        placeholder="Title"
                        aria-describedby="passwordHelp"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="border-t p-4 flex justify-end">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded mr-2">Close</button>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded">Save changes</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;