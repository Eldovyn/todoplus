'use client';
import React, { useState, useEffect } from 'react';
import NavBar from '@/components/NavBar';
import { MdOutlineHistoryToggleOff } from 'react-icons/md';
import { apiSearchTitle, apiTaskPagination } from '@/api/task';
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

    const [loadingSearch, setLoadingSearch] = useState(false);

    const [searchTitle, setSearchTitle] = useState('');

    const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            setLoadingSearch(true);
            const accessToken = Cookies.get('accessToken');
            let response;
            if (searchTitle) {
                response = await apiSearchTitle(accessToken as string, searchTitle, "0");
            } else {
                response = await apiTaskPagination(accessToken as string, "0", '5');
            }
            const resp = await response.json();
            if (response.status !== 200) {
                setLoadingSearch(false);
                return;
            }
            setListTask(resp.page.tasks);
            setLimit(resp.page.limit === 0 ? resp.page.size : resp.page.limit);
            setTotalPage(resp.page.total_page);
            setItemsPerPage(resp.page.per_page);
            setTotalItems(resp.page.size);
            setLoadingSearch(false);
        }
    };

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
            <div className="container mx-auto px-4 mt-[5rem]">
                <div className='bg-gray-900 mb-3 text-white font-semibold rounded-md flex justify-center items-center w-[45%] mx-auto p-4'>
                    <MdOutlineHistoryToggleOff size={25} />
                    <div className="me-1 ms-1">History</div>
                </div>
                <div className="flex items-center justify-end me-[27.6%]">
                    <div className="relative w-[13%]">
                        <input
                            type="text"
                            placeholder="Cari Title...."
                            className="border-gray-900 border rounded-md mt-3 mb-3 w-full p-2 pr-10 active:border-gray-900"
                            onKeyDown={loadingSearch ? () => { } : handleKeyDown}
                            onChange={(e) => setSearchTitle(e.target.value)}
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m2.35-8a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>
                </div>
                <br />
                {listTask ? '' : <hr className='mx-auto w-[45%]' />}
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
                {loading ? '' : listTask ? '' : <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} itemsPerPage={itemsPerPage} totalItems={totalItems} totalPages={totalPage} pageLimit={5} />}
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
            </div>
        </>
    );
}

export default HistoryPage;
