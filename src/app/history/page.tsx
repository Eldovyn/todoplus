'use client';
import React, { useState, useEffect } from 'react';
import NavBar from '@/components/NavBar';
import { MdOutlineHistoryToggleOff } from 'react-icons/md';
import { apiTaskPagination, apiDeleteTask, apiTaskComplete } from '@/api/task';
import Cookies from 'js-cookie';
import LoadingSpinnerComponent from 'react-spinners-components';
import { FaTrash } from "react-icons/fa";
import { alertFailed, alertSuccess } from '@/components/ui/Alert';
import Pagination from '@/components/ui/Pagination';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';
import { MdEdit } from 'react-icons/md';
import Modal from '@/components/ui/History/Modal';

function HistoryPage() {
    const [currentPage, setCurrentPage] = useState(0);
    const [limit, setLimit] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(0);
    const [totalItems, setTotalItems] = useState(0);

    const [isOpen, setIsOpen] = useState(false);

    const [listTask, setListTask] = useState<any[][]>([[]]);
    const [loading, setLoading] = useState(true);

    const [loadingCompleted, setLoadingCompleted] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

    const openModal = (id: string) => {
        console.log("Opening modal with ID:", id); // Debug log
        setSelectedTaskId(id);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedTaskId(null);
        setIsModalOpen(false);
    };

    const handleUpdateIsCompleted = (id: string, isCompleted: boolean) => {
        setLoadingCompleted(true);
        const apiUpdateTask_ = async () => {
            let response = await apiTaskComplete(Cookies.get('accessToken') ?? '', id, 0, !isCompleted);
            let resp = await response.json();
            if (response.status !== 201) {
                await alertFailed(resp.message);
                setLoadingCompleted(false);
                return;
            }
            await alertSuccess(resp.message);
            setListTask(resp.page.tasks);
            setLimit(resp.page.size);
            setTotalPage(resp.page.total_page);
            setItemsPerPage(resp.data.per_page);
            setTotalItems(resp.page.size);
            setLoadingCompleted(false);
        };
        apiUpdateTask_();
    };

    const handleRemoveListTask = async (id: string) => {
        console.log("Deleting task with ID:", id); // Debug log
        setLoadingDelete(true);
        const accessToken = Cookies.get('accessToken');
        const response = await apiDeleteTask(accessToken ?? '', id);
        const resp = await response.json();
        if (response.status !== 201) {
            await alertFailed(resp.message);
            setLoadingDelete(false);
            return;
        }
        setListTask(resp.page.tasks);
        await alertSuccess(resp.message);
        setTotalPage(resp.page.total_page);
        setLoadingDelete(false);
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const accessToken = Cookies.get('accessToken');
            if (accessToken) {
                const response = await apiTaskPagination(accessToken, "0", '5');
                const resp = await response.json();
                if (response.status === 200) {
                    setListTask(resp.page.tasks);
                    setLimit(resp.page.limit === 0 ? resp.page.size : resp.page.limit);
                    setTotalPage(resp.page.total_page);
                    setItemsPerPage(resp.page.per_page);
                    setTotalItems(resp.page.size);
                }
                setLoading(false);
            }
        };

        fetchData();
    }, [currentPage]);

    return (
        <>
            <NavBar isOpen={isOpen} setIsOpen={setIsOpen} />
            <div className='bg-gray-900 mb-3 text-white font-semibold mt-[10rem] rounded-md flex justify-center items-center w-[45%] mx-auto p-4'>
                <MdOutlineHistoryToggleOff size={25} />
                <div className="me-1 ms-1">History</div>
            </div>
            <br />
            <hr className='mx-auto w-[45%]' />
            <br />
            {loading ? (
                <LoadingSpinnerComponent type={'Spinner'} color={'black'} size={'50px'} />
            ) : (
                listTask[currentPage] && listTask[currentPage].length > 0 ? (
                    listTask[currentPage].map((item: any) => (
                        <div key={item.task_id} className="border rounded-lg shadow p-4 text-white w-[45%] mx-auto m-5 bg-gray-900 flex justify-between items-center">
                            <p className={`text-sm ${item.is_completed ? 'line-through' : ''}`}>{item.title}</p>
                            <div className="flex flex-row items-center">
                                <FaTrash size={18} className="m-1 cursor-pointer" onClick={loadingDelete ? () => { } : () => handleRemoveListTask(item.task_id)} />
                                <MdEdit size={18} className="m-1 cursor-pointer" onClick={() => openModal(item.task_id)} />
                                <input className="cursor-pointer m-1 form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out" type="checkbox" checked={item.is_completed} id="flexCheckDefault" onChange={loadingCompleted ? () => { } : () => handleUpdateIsCompleted(item.task_id, item.is_completed)} />
                            </div>
                        </div>
                    ))
                ) : ''
            )}
            {loading ? '' : <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} itemsPerPage={itemsPerPage} totalItems={totalItems} totalPages={totalPage} pageLimit={5} />}
            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                id={selectedTaskId}
                setListTask={setListTask}
                limit={limit}
                setLimit={setLimit}
                setTotalPage={setTotalPage}
                setItemsPerPage={setItemsPerPage}
                setTotalItems={setTotalItems}
            />
            <ToastContainer />
            <br />
            <br />
        </>
    );
}

export default HistoryPage;
