import React, { useState, useEffect } from 'react';
import { apiUpdateTitle } from '@/api/task';
import { alertFailed, alertSuccess } from '../Alert';
import Cookies from 'js-cookie';
import LoadingSpinnerComponent from 'react-spinners-components';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    id: string | null;
    setListTask: React.Dispatch<React.SetStateAction<any>>;
    limit: number;
    setLimit: React.Dispatch<React.SetStateAction<number>>;
    setTotalPage: React.Dispatch<React.SetStateAction<number>>;
    setItemsPerPage: React.Dispatch<React.SetStateAction<number>>;
    setTotalItems: React.Dispatch<React.SetStateAction<number>>;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, id, setListTask, limit, setLimit, setTotalPage, setItemsPerPage, setTotalItems }) => {
    const [title, setTitle] = useState('');
    const [titleError, setTitleError] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setTitle('');
        setTitleError(false);
    }, [id]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!id) return; // Jika ID tidak valid
        setLoading(true);
        const response = await apiUpdateTitle(Cookies.get('accessToken') ?? '', title, id, limit);
        const resp = await response.json();
        if (response.status !== 201) {
            setTitleError(true);
            alertFailed(resp.message);
            setLoading(false);
            return;
        }
        setListTask(resp.page.tasks);
        setLimit(resp.page.limit || resp.page.size);
        setTotalPage(resp.page.total_page);
        setItemsPerPage(resp.data.per_page);
        setTotalItems(resp.page.size);
        alertSuccess(resp.message);
        onClose();
        setLoading(false);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <form className="bg-white rounded-lg shadow-lg w-1/3" onSubmit={handleSubmit}>
                <div className="border-b p-4 flex justify-between items-center">
                    <h5 className="text-lg font-bold">Edit Task</h5>
                    <button onClick={onClose} type="button" className="text-gray-400 hover:text-black">&times;</button>
                </div>
                <div className="p-4">
                    <label className="block mb-2">Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className={`border rounded-lg p-2 w-full ${titleError ? 'border-red-500' : ''}`}
                        placeholder="Enter title"
                    />
                </div>
                <div className="flex justify-end p-4">
                    {loading ? (
                        <LoadingSpinnerComponent type="Spinner" size="30px" color="black" />
                    ) : (
                        <>
                            <button type="button" onClick={onClose} className="px-4 py-2 text-gray-500 hover:text-black">Cancel</button>
                            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Submit</button>
                        </>
                    )}
                </div>
            </form>
        </div>
    );
};

export default Modal;
