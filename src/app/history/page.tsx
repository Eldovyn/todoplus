'use client';
import React, { useState, useEffect } from 'react';
import NavBar from '@/components/NavBar';
import { MdOutlineHistoryToggleOff } from 'react-icons/md';
import { apiTaskPagination } from '@/api/user';
import Cookies from 'js-cookie';
import LoadingSpinnerComponent from 'react-spinners-components';
import Modal from '@/components/ui/Modal';
import TrashTask from '@/components/ui/TrashTask';
import EditTask from '@/components/ui/EditTask';
import Completed from '@/components/ui/Completed';

function HistoryPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const [isOpen, setIsOpen] = useState(false);

    const [listTask, setListTask] = useState<any[]>([]);
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
            const accessToken = Cookies.get('accessToken');
            if (accessToken) {
                const response = await apiTaskPagination(accessToken, '0', '5');
                const resp = await response.json();
                if (response.status === 200) {
                    console.log(resp.page.tasks);
                    setListTask(resp.page.tasks);
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
                listTask[currentPage].length > 0 ? (
                    listTask[currentPage].map((item: any, index: number) => (
                        <div key={item.id} className="border rounded-lg shadow p-4 text-white w-[45%] mx-auto m-5 bg-gray-900 flex justify-between items-center">
                            <p>{item.title}</p>
                            <div className="flex flex-row items-center">
                                <TrashTask item={item} setListTask={setListTask} />
                                <EditTask item={item} openModal={openModal} />
                                <Completed item={item} setListTask={setListTask} />
                                <Modal
                                    isOpen={isModalOpen}
                                    onClose={closeModal}
                                    id={selectedTaskId || ""}
                                    setListTask={setListTask}
                                />
                            </div>
                        </div>
                    ))
                ) : (
                    ''
                )
            )}
        </>
    );
}

export default HistoryPage;