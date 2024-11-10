"use client";
import React from 'react';
import IconWeb from '../../../public/IconRemoverBg.png'
import Image from 'next/image'
import { FaTasks } from "react-icons/fa";
import { MdOutlineAccountCircle } from "react-icons/md";
import { LuHistory } from "react-icons/lu";

const Sidebar = () => {
  // Event handler untuk meng-handle klik pada setiap item
  const handleItemClick = (itemName: string) => {
    alert(`You clicked on ${itemName}`);
  };

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
                href="#"
                onClick={() => handleItemClick("Home")}
                className="flex items-center px-2 py-2 text-gray-200 hover:bg-gray-700 rounded"
              >
                <i className="bi bi-house text-lg mr-2"></i>
                <FaTasks />
                <span className="hidden sm:inline ms-2">Task</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={() => handleItemClick("Dashboard")}
                className="flex items-center px-2 py-2 text-gray-200 hover:bg-gray-700 rounded"
              >
                <i className="bi bi-speedometer2 text-lg mr-2"></i>
                <LuHistory />
                <span className="hidden sm:inline ms-2">History</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={() => handleItemClick("Dashboard")}
                className="flex items-center px-2 py-2 text-gray-200 hover:bg-gray-700 rounded"
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
      <main className="flex-1 p-6">
        Content area...
      </main>
    </div>
  );
};

export default Sidebar;
