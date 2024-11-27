'use client';
import React, { useState } from 'react';
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { IoIosArrowDroprightCircle } from "react-icons/io";

function Pagination() {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const totalItems = 200;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const pageLimit = 5;

    const onPageChange = (page: number) => {
        setCurrentPage(page);
    };

    const getPageNumbers = () => {
        let startPage = 1;
        let endPage = totalPages;

        if (totalPages > pageLimit) {
            if (currentPage <= Math.ceil(pageLimit / 2)) {
                startPage = 1;
                endPage = pageLimit;
            } else if (currentPage + Math.floor(pageLimit / 2) >= totalPages) {
                startPage = totalPages - pageLimit + 1;
                endPage = totalPages;
            } else {
                startPage = currentPage - Math.floor(pageLimit / 2);
                endPage = currentPage + Math.floor(pageLimit / 2);
            }
        }

        const pages = [];
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
        return pages;
    };

    const pageNumbers = getPageNumbers();

    return (
        <nav aria-label="Pagination Navigation" className="flex justify-center">
            <ul className="flex list-none p-0">
                <li className={`page-item ${currentPage === 1 ? 'pointer-events-none opacity-50' : ''}`}>
                    <button
                        className="page-link w-12 px-3 py-2 border border-gray-300 rounded-l-lg flex justify-center items-center"
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        <IoIosArrowDropleftCircle className='text-blue-500 w-6 h-6' />
                    </button>
                </li>
                {pageNumbers.map((number) => (
                    <li key={number} className={`page-item ${currentPage === number ? 'active bg-blue-500 text-white' : ''}`}>
                        <button
                            onClick={() => onPageChange(number)}
                            className="page-link w-12 px-3 py-2 border border-gray-300 flex justify-center items-center"
                        >
                            {number}
                        </button>
                    </li>
                ))}
                <li className={`page-item ${currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}`}>
                    <button
                        className="page-link w-12 px-3 py-2 border border-gray-300 rounded-r-lg flex justify-center items-center"
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        <IoIosArrowDroprightCircle className='text-blue-500 w-6 h-6' />
                    </button>
                </li>
            </ul>
        </nav>
    );
}

export default Pagination;
