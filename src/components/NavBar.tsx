import React from "react";
import { IoMdAddCircle } from "react-icons/io";
import { MdOutlineHistoryToggleOff } from "react-icons/md";
import IconWeb from '../../public/IconRemoverBg.png';
import Image from "next/image";
import Dropdown from "./ui/Dropdown";
import { redirect } from 'next/navigation';

interface NavBarProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavBar: React.FC<NavBarProps> = ({ isOpen, setIsOpen }) => {
    return (
        <>
            <nav className="relative bg-gray-900 p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-2 overflow-visible">
                        <Image src={IconWeb} alt="" className="w-10" />
                        <p className="font-bold text-md text-white min-w-[6rem]">TodoPlus</p>
                    </div>
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
                            <li className="nav-item" onClick={() => redirect('/')}>
                                <div className="flex flex-row text-white items-center cursor-pointer">
                                    <IoMdAddCircle size={25}/>
                                    <div className="me-1 ms-1">Todo List</div>
                                </div>
                            </li>
                            <li className="nav-item">
                                <div className="flex flex-row text-white items-center cursor-pointer">
                                    <MdOutlineHistoryToggleOff size={25} />
                                    <div className="me-1 ms-1">History</div>
                                </div>
                            </li>
                            <li className="nav-item">
                                <Dropdown />
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default NavBar