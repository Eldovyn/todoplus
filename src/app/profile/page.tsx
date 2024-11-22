'use client';
import React, { useState } from "react";
import NavBar from "@/components/NavBar";
import { FaAddressCard } from "react-icons/fa6";
import { FaKey } from "react-icons/fa6";
import FormProfile from "@/components/FormProfile";
import FormPassword from "@/components/FormPassword";

const Profile: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <NavBar isOpen={isOpen} setIsOpen={setIsOpen} />
            <div className="mx-auto px-4 w-[55%] mt-[10rem] text-center p-5 bg-gray-900 text-white rounded-md">
                <div className="flex justify-between text-gray-900 font-bold">
                    <div className="flex flex-row items-center bg-white rounded-md p-3 w-[47%]">
                        <FaAddressCard className="text-2xl pr-1" />
                        <p className="text-center pr-1">Informasi</p>
                        <p className="text-center">Profile</p>
                    </div>
                    <div className="flex flex-row items-center bg-white rounded-md p-3 w-[47%]">
                        <FaKey className="text-2xl pr-1" />
                        <p className="text-center pr-1">Rubah</p>
                        <p className="text-center">Password</p>
                    </div>
                </div>
                <div className="flex justify-between mt-4">
                    <FormProfile />
                    <FormPassword />
                </div>
            </div>
        </>
    )
};

export default Profile;