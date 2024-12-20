import React, { useEffect, useState } from "react";
import { IoMdAddCircle } from "react-icons/io";
import { MdOutlineHistoryToggleOff } from "react-icons/md";
import IconWeb from '../../public/IconRemoverBg.png';
import Dropdown from "./ui/Dropdown";
import Link from 'next/link';
import { apiGetUser } from "@/api/user";
import Cookies from "js-cookie";
import { redirect } from "next/navigation";
import Image from "next/image";
import defaultAvatar from '../../public/avatar.jpg';

interface NavBarProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavBar: React.FC<NavBarProps> = ({ isOpen, setIsOpen }) => {
    const [profileUrl, setProfileUrl] = useState(defaultAvatar);

    useEffect(() => {
        const fetchMe = async () => {
            const accessToken = Cookies.get('accessToken');
            const response = await apiGetUser(accessToken ?? '');
            const resp = await response.json();
            if (response.status === 200 && resp.data) {
                console.log(resp.data);
                setProfileUrl(resp.data.avatar || defaultAvatar);
            } else {
                Cookies.remove('accessToken');
                redirect('/login');
            }
        }

        fetchMe();
    }, []);

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
                            <Image src={profileUrl} alt="" width={25} height={25} className="rounded-full" />
                        </svg>
                    </button>
                    <div
                        className={`absolute top-full left-0 w-full bg-gray-900 md:static md:flex justify-end ${isOpen ? "block" : "hidden"}`}
                        id="navbarNav"
                    >
                        <ul className={`md:flex items-center space-y-4 md:space-y-0 md:space-x-4 p-4 md:p-0 text-lg`}>
                            <li className="nav-item">
                                <Link href="/">
                                    <div className="flex flex-row text-white items-center cursor-pointer">
                                        <IoMdAddCircle size={25} />
                                        <div className="me-1 ms-1">Todo List</div>
                                    </div>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href="/history">
                                    <div className="flex flex-row text-white items-center cursor-pointer">
                                        <MdOutlineHistoryToggleOff size={25} />
                                        <div className="me-1 ms-1">History</div>
                                    </div>
                                </Link>
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

export default NavBar;
