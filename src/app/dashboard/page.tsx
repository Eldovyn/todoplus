"use client";
import React, { use } from 'react';
import IconWeb from '../../../public/IconRemoverBg.png'
import Image from 'next/image'
import { FaTasks } from "react-icons/fa";
import { MdOutlineAccountCircle } from "react-icons/md";
import { LuHistory } from "react-icons/lu";
import { IoMdAdd } from "react-icons/io";
import { useState, useEffect } from 'react';
import AddTask from '@/components/AddTask';

const Sidebar: React.FunctionComponent = () => {
  const [page, setPage] = useState<React.FunctionComponent>(AddTask);
  const [content, setContent] = useState('');

  const handleItemClick = (component: React.FunctionComponent) => {
    setPage(component);
  };

  useEffect(() => {
    handleItemClick(AddTask);
  }, []);

  const setTask = () => {
    setPage(AddTask)
    setContent('Task')
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-gray-900 text-white flex flex-col">
        <div className='flex justify-start p-5'>
          <Image src={IconWeb} alt='' className='w-11 me-2' />
          <p className='font-bold text-lg'>TodoPlus</p>
        </div>
        <nav className="flex-1 px-2">
          <ul className="space-y-2">
            <li>
              <a
                onClick={setTask}
                className="flex items-center px-2 py-2 text-gray-200 hover:bg-gray-700 rounded cursor-pointer"
              >
                <i className="bi bi-house text-lg mr-2"></i>
                <IoMdAdd />
                <span className="hidden sm:inline ms-2">Create</span>
              </a>
            </li>
            <li>
              <a
                onClick={setTask}
                className="flex items-center px-2 py-2 text-gray-200 hover:bg-gray-700 rounded cursor-pointer"
              >
                <i className="bi bi-house text-lg mr-2"></i>
                <FaTasks />
                <span className="hidden sm:inline ms-2">Task</span>
              </a>
            </li>
            <li>
              <a
                onClick={setTask}
                className="flex items-center px-2 py-2 text-gray-200 hover:bg-gray-700 rounded cursor-pointer"
              >
                <i className="bi bi-speedometer2 text-lg mr-2"></i>
                <LuHistory />
                <span className="hidden sm:inline ms-2">History</span>
              </a>
            </li>
            <li>
              <a
                onClick={setTask}
                className="flex items-center px-2 py-2 text-gray-200 hover:bg-gray-700 rounded cursor-pointer"
              >
                <i className="bi bi-speedometer2 text-lg mr-2"></i>
                <MdOutlineAccountCircle />
                <span className="hidden sm:inline ms-2">Account</span>
              </a>
            </li>
          </ul>
        </nav>
        <div className="p-4">
          <div className="flex items-center space-x-2 text-gray-300">
            <img
              src="https://github.com/mdo.png"
              alt="hugenerd"
              className="w-8 h-8 rounded-full"
            />
            <span className="hidden sm:inline">loser</span>
          </div>
        </div>
      </aside>
      <main className="flex-1 p-6 flex justify-center items-center">
        <>{page}</>
      </main>
    </div>
  );
};

export default Sidebar;