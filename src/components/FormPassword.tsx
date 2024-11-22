import React from "react";

const FormPassword: React.FC = () => {
    return (
        <>
            <form className="flex flex-col text-gray-900 w-[47%]">
                <p className="text-left text-sm pt-3 text-gray-300 pb-1">Password</p>
                <input
                    type="text"
                    className="block w-full px-4 py-2 text-base text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    id="passwordInput"
                    placeholder="name@example.com"
                />
                <p className="text-left text-sm pt-5 text-gray-300 pb-1">Konfirmasi Password</p>
                <input
                    type="text"
                    className="block w-full px-4 py-2 text-base text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    id="passwordInput"
                    placeholder="name@example.com"
                />
                <button type="submit" className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md">Submit Password</button>
            </form>
        </>
    )
};

export default FormPassword