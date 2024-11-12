import React from "react";
import { IoMdAddCircle } from "react-icons/io";
import { FaTasks } from "react-icons/fa";
import { FaHistory } from "react-icons/fa";

const AccountPage: React.FunctionComponent = () => {
    return (
        <>
            <div className="h-screen mx-auto w-full bg-white">
                <div className="flex flex-row-reverse w-full bg-gray-900 p-[1.52rem]">
                    <IoMdAddCircle className="text-white me-2 ms-2" size={20} />
                    <FaTasks className="text-white me-2 ms-2" size={20} />
                    <FaHistory className="text-white me-2 ms-2" size={20} />
                </div>
            </div>
        </>
    )
}

export default AccountPage;
