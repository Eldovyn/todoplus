import React from "react";
import { IoMdAddCircle } from "react-icons/io";
import { FaTasks } from "react-icons/fa";
import { FaHistory } from "react-icons/fa";

const AddTask: React.FunctionComponent = () => {
    return (
        <>
            <div className="h-screen mx-auto w-full bg-white">
                <div className="flex flex-row-reverse w-full bg-gray-900 p-[1.52rem]">
                    <IoMdAddCircle className="text-white me-2 ms-2" size={20} />
                    <FaTasks className="text-white me-2 ms-2" size={20} />
                    <FaHistory className="text-white me-2 ms-2" size={20} />
                </div>
                <div className="border rounded-md p-4 bg-gray-900 w-[60%] mx-auto flex justify-center items-center mt-[17rem] text-white">
                    <form className="w-full mx-auto p-4">
                        <div className="mb-3">
                            <input type="text" placeholder="Task" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black" id="email" aria-describedby="emailHelp" />
                        </div>
                        <div className="mb-3">
                            <input type="text" placeholder="Description" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black" id="password" />
                        </div>
                        <div className="flex justify-end">
                            <button type="submit" className="w-[8rem] inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AddTask;
