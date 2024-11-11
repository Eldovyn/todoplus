import React from "react";

const AddTask: React.FunctionComponent = () => {
    return (
        <>
            <div className="flex items-center justify-center w-[95%]">
                <div className="border border-gray-300 rounded-lg p-4 bg-[#111827] shadow-md max-h-screen mx-auto w-full">
                    <form action="">
                        <div className="mb-3 mt-3">
                            <input
                                type="text"
                                id="exampleInputEmail1"
                                className="mt-1 block px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm w-full mx-auto"
                                placeholder="Task"
                                aria-describedby="emailHelp"
                            />
                        </div>
                        <div className="mb-3 mt-3">
                            <input
                                type="text"
                                id="exampleInputEmail1"
                                className="mt-1 block px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm w-full mx-auto"
                                placeholder="Description"
                                aria-describedby="emailHelp"
                            />
                        </div>
                        <button type="button" className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex justify-self-end w-[8rem]">
                            <p className="mx-auto">Save</p>
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AddTask;
