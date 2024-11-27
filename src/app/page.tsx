'use client';
import React, { useState, useEffect } from "react";
import AddTask from "@/components/AddTask";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';
import Cookies from 'js-cookie';
import LoadingSpinnerComponent from 'react-spinners-components';
import NavBar from "@/components/NavBar";
import Modal from "@/components/ui/Modal";
import TrashTask from "@/components/ui/TrashTask";
import EditTask from "@/components/ui/EditTask";
import Completed from "@/components/ui/Completed";
import { apiAllTask } from "@/api/user";

const Home: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [listTask, setListTask] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    const fetchData = async () => {
      const accessToken = Cookies.get('accessToken');
      const response = await apiAllTask(accessToken ?? '', '5');
      const resp = await response.json();
      if (response.status === 200) {
        setListTask(resp.data);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <>
      <NavBar isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="mx-auto px-4 w-full text-center">
        <p className="text-black font-bold text-3xl text-center pt-[6rem]">Apa Rencanamu Hari Ini ?</p>
        <AddTask listTask={listTask} setListTask={setListTask} />
        {listTask.length > 0 && (<> <br /> <hr className="w-[60%] mx-auto" /> <br /> </>)}
        {
          loading ? <LoadingSpinnerComponent type={'Spinner'} color={'black'} size={'50px'} /> :
            listTask.slice(0, 5).map((item: any) => (
              <div key={item.id} className="border rounded-lg shadow p-4 text-white w-[60%] mx-auto m-5 bg-gray-900">
                <div className="p-1 flex justify-between items-center">
                  <p className={`text-sm ${item.is_completed ? 'line-through' : ''}`}>{item.title}</p>
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
              </div>
            ))
        }
      </div>
      <ToastContainer />
    </>
  );
};

export default Home;
