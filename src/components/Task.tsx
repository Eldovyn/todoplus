import React from "react";
import Dropdown from "./ui/Dropdown";

const Task: React.FunctionComponent = () => {
    return (
        <>
            <div className="flex items-center justify-center w-[95%]">
                <div className="border border-gray-300 rounded-lg p-4 bg-[#111827] shadow-md max-h-screen mx-auto w-full">
                    <div className="flex justify-around font-bold text-white mb-3">
                        <p className="flex-1 text-center">Task</p>
                        <p className="flex-1 text-center">Status</p>
                        <p className="flex-1 text-center">Action</p>
                    </div>
                    <hr />
                    <div className="flex justify-around text-white mt-3 text-sm mb-3">
                        <p className="flex-1 text-center pt-2">Task 1</p>
                        <Dropdown />
                        <p className="flex-1 text-center pt-2">Status</p>
                    </div>
                    <hr />
                    <div className="flex justify-around text-white mt-3 text-sm mb-3">
                        <p className="flex-1 text-center mx-auto pt-2">Task 1</p>
                        <Dropdown />
                        <p className="flex-1 text-center pt-2">Status</p>
                    </div>
                    <hr />
                    <div className="flex justify-around text-white mt-3 text-sm">
                        <p className="flex-1 text-center pt-2">Task 1</p>
                        <Dropdown />
                        <p className="flex-1 text-center pt-2">Status</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Task