'use client';
import React, { useState } from "react";
import { IoMdAddCircle } from "react-icons/io";
import { MdOutlineHistoryToggleOff } from "react-icons/md";
import { MdAccountCircle } from "react-icons/md";
import { IoAdd } from 'react-icons/io5';

const Home: React.FunctionComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="relative bg-gray-900 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <a className="text-white text-lg font-bold" href="#">Navbar</a>
          <button
            className="text-white focus:outline-none md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-controls="navbarNav"
            aria-expanded={isOpen}
            aria-label="Toggle navigation"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
          <div
            className={`absolute top-full left-0 w-full bg-gray-900 md:static md:flex justify-end ${isOpen ? "block" : "hidden"}`}
            id="navbarNav"
          >
            <ul className={`md:flex items-center space-y-4 md:space-y-0 md:space-x-4 p-4 md:p-0 text-lg`}>
              <li className="nav-item">
                <div className="flex flex-row text-white items-center cursor-pointer">
                  <IoMdAddCircle size={25} />
                  <div className="me-1 ms-1">Todo List</div>
                </div>
              </li>
              <li className="nav-item">
                <div className="flex flex-row text-white items-center cursor-pointer">
                  <MdOutlineHistoryToggleOff size={25} />
                  <div className="me-1 ms-1">Todo List</div>
                </div>
              </li>
              <li className="nav-item">
                <div className="flex flex-row text-white items-center cursor-pointer">
                  <MdAccountCircle size={25} />
                  <div className="me-1 ms-1">Account</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="mx-auto px-4 bg-whiteh-screen w-full">
        <p className="text-black font-bold text-3xl text-center pt-[10rem]">Apa Rencanamu Hari Ini ?</p>
        <form className="mb-3 mt-3 flex justify-center items-center">
          <div className="flex items-center w-[50rem]">
            <input
              type="text"
              placeholder="Tulis Disini ..."
              className="flex-1 px-4 py-2 text-gray-800 placeholder-gray-600 bg-teal-400 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-teal-500 h-12"
            />
            <button
              className="flex items-center justify-center px-4 bg-teal-600 text-white rounded-r-lg hover:bg-teal-700 transition h-12"
              aria-label="Add"
            >
              <IoAdd className="text-xl" />
            </button>
          </div>
        </form>
        <br />
        <hr className="w-[80rem] mx-auto"/>
        <br />
        <div className="border rounded-lg shadow p-4 text-white w-[80rem] mx-auto m-5 bg-gray-900">
          <div className="p-4">
            This is some text within a card body.
          </div>
        </div>
        <div className="border rounded-lg shadow p-4 text-white w-[80rem] mx-auto m-5 bg-gray-900">
          <div className="p-4">
            This is some text within a card body.
          </div>
        </div>
        <div className="border rounded-lg shadow p-4 text-white w-[80rem] mx-auto m-5 bg-gray-900">
          <div className="p-4">
            This is some text within a card body.
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
