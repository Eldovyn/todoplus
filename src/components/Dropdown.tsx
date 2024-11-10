import React, { useState } from 'react';

const Dropdown: React.FunctionComponent = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="flex-1 text-center">
            <button
                onClick={toggleDropdown}
                className="px-4 py-2 text-sm font-medium text-white bg-gray-700 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
                Dropdown button
            </button>

            {isOpen && (
                <ul className="absolute right-0 me-[7.5rem] mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
                    <li>
                        <a className="block px-4 py-2 text-gray-700 hover:bg-gray-100" href="#">Action</a>
                    </li>
                    <li>
                        <a className="block px-4 py-2 text-gray-700 hover:bg-gray-100" href="#">Another action</a>
                    </li>
                    <li>
                        <a className="block px-4 py-2 text-gray-700 hover:bg-gray-100" href="#">Something else here</a>
                    </li>
                </ul>
            )}
        </div>
    );
};

export default Dropdown;
