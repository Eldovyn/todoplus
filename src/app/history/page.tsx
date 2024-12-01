'use client';
import React, { useState, useEffect } from 'react';
import NavBar from '@/components/NavBar';
import { MdOutlineHistoryToggleOff } from 'react-icons/md';
import { apiTaskPagination } from '@/api/task';
import Cookies from 'js-cookie';
import LoadingSpinnerComponent from 'react-spinners-components';
import Pagination from '@/components/ui/Pagination';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';
import { MdEdit } from 'react-icons/md';
import Modal from '@/components/ui/History/Modal';
import TrashTask from '@/components/ui/History/TrashTask';
import Completed from '@/components/ui/History/Completed';
import { redirect } from 'next/navigation';

function HistoryPage() {
    const [currentPage, setCurrentPage] = useState(0);
    const [limit, setLimit] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(0);
    const [totalItems, setTotalItems] = useState(0);

    const [isOpen, setIsOpen] = useState(false);

    const [listTask, setListTask] = useState<any[][]>([[]]);
    const [loading, setLoading] = useState(true);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

    const openModal = (id: string) => {
        setSelectedTaskId(id);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedTaskId(null);
        setIsModalOpen(false);
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
                if (response.status === 403) {
                    Cookies.remove('accessToken');
                    redirect('/login');
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
                                <TrashTask item={item} setListTask={setListTask} setTotalPage={setTotalPage} />
                                <MdEdit size={18} className="m-1 cursor-pointer" onClick={() => openModal(item.task_id)} />
                                <Completed item={item} setListTask={setListTask} setTotalPage={setTotalPage} setItemsPerPage={setItemsPerPage} setTotalItems={setTotalItems} setLimit={setLimit} />
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
