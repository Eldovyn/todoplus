import React, { useState } from 'react';
import { MdAccountCircle } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
import Cookies from 'js-cookie';
import { redirect } from 'next/navigation';

const Dropdown = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleLogout = () => {
        Cookies.remove('accessToken');
        redirect('/');
    };

    return (
        <div className="relative inline-block text-left">
            <button
                onClick={toggleDropdown}
                className="inline-flex justify-center w-full rounded-md border shadow-sm px-4 py-2 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                id="menu-button"
                aria-expanded={isOpen}
                aria-haspopup="true"
            >
                <div className="flex flex-row text-white items-center cursor-pointer">
                    <MdAccountCircle size={25} />
                    <div className="me-1 ms-1">Account</div>
                </div>
            </button>
            {isOpen && (
                <div
                    className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                    tabIndex={-1}
                >
                    <div className="py-1" role="none">
                        <div className="flex flex-row text-white items-center cursor-pointer ms-2 text-sm m-1">
                            <MdAccountCircle size={25} color='#374151' />
                            <div className="pl-1 text-gray-700">Account</div>
                        </div>
                        <button onClick={handleLogout} className="flex flex-row text-white items-center cursor-pointer ms-2 text-sm m-1">
                            <IoIosLogOut size={25} color='#374151' />
                            <div className="pl-1 text-gray-700">Logout</div>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dropdown;
