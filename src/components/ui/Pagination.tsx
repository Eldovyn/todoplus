'use client';
import React from 'react';
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from "react-icons/io";

interface PaginationProps {
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
    pageLimit: number;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, setCurrentPage, itemsPerPage, totalItems, totalPages, pageLimit }) => {
    const onPageChange = (page: number) => {
        setCurrentPage(page - 1);
        console.log(page);
    };

    const getPageNumbers = () => {
        let startPage = 1;
        let endPage = totalPages;

        if (totalPages > pageLimit) {
            if (currentPage + 1 <= Math.ceil(pageLimit / 2)) {
                startPage = 1;
                endPage = pageLimit;
            } else if ((currentPage + 1) + Math.floor(pageLimit / 2) >= totalPages) {
                startPage = totalPages - pageLimit + 1;
                endPage = totalPages;
            } else {
                startPage = (currentPage + 1) - Math.floor(pageLimit / 2);
                endPage = (currentPage + 1) + Math.floor(pageLimit / 2);
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
                <li className={`page-item ${currentPage === 0 ? 'pointer-events-none opacity-50' : ''}`}>
                    <button
                        className="page-link w-12 px-3 py-2 border border-gray-300 rounded-l-lg flex justify-center items-center"
                        onClick={() => onPageChange(currentPage)}
                        disabled={currentPage === 0}
                    >
                        <IoIosArrowDropleftCircle className='text-blue-500 w-6 h-6' />
                    </button>
                </li>
                {pageNumbers.map((number) => (
                    <li key={number} className={`page-item ${currentPage + 1 === number ? 'active bg-blue-500 text-white' : ''}`}>
                        <button
                            onClick={() => onPageChange(number)}
                            className="page-link w-12 px-3 py-2 border border-gray-300 flex justify-center items-center"
                        >
                            {number}
                        </button>
                    </li>
                ))}
                <li className={`page-item ${currentPage + 1 === totalPages || totalPages === 0 ? 'pointer-events-none opacity-50' : ''}`}>
                    <button
                        className="page-link w-12 px-3 py-2 border border-gray-300 rounded-r-lg flex justify-center items-center"
                        onClick={() => onPageChange(currentPage + 2)}
                        disabled={currentPage + 1 === totalPages || totalPages === 0}
                    >
                        <IoIosArrowDroprightCircle className='text-blue-500 w-6 h-6' />
                    </button>
                </li>
            </ul>
        </nav>
    );
}

export default Pagination;
