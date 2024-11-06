import React, { useState } from 'react';
import { Button4 } from './Buttons';

export const Table = ({ headers = [], data = [], onRowClick }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
    const rowsPerPage = 6;
    
    const sortedData = React.useMemo(() => {
        let sortableItems = [...data];
        if (sortConfig !== null) {
            sortableItems.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [data, sortConfig]);

    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const currentData = sortedData.slice(startIndex, endIndex);

    const totalPages = Math.ceil(data.length / rowsPerPage);

    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        console.log("Sort config:", { key, direction });
        setSortConfig({ key, direction });
    };
    
    return (
        <div className='h-4/6'>
            <div className="overflow-x-auto rounded-xl">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-custom-2 w-full">
                        <tr>
                            {headers.map((header, index) => (
                                <th
                                    key={index}
                                    className="px-3 py-3 text-white text-left text-xs font-medium text-custom-1 uppercase tracking-wider"
                                    onClick={() => requestSort(header.key)}
                                >
                                    <div className="flex flex-row items-center justify-center gap-2">
                                        <div className="cursor-pointer">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14.944" height="20.915" viewBox="0 0 14.944 20.915" className="ml-2" fill='white'>
                                                <path id="Icon_fa-solid-sort" data-name="Icon fa-solid-sort" d="M6.412,2.689a1.5,1.5,0,0,1,2.115,0L14.5,8.664a1.5,1.5,0,0,1-1.06,2.553H1.492A1.5,1.5,0,0,1,.433,8.664L6.408,2.689Zm0,20.039L.437,16.754A1.5,1.5,0,0,1,1.5,14.2H13.442a1.5,1.5,0,0,1,1.06,2.553L8.527,22.729a1.5,1.5,0,0,1-2.115,0Z" transform="translate(0.004 -2.252)"/>
                                            </svg>
                                        </div>
                                        {header.label}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 w-full">
                        {currentData.map((row, rowIndex) => {
                            return (
                                <tr
                                    key={row.id}
                                    className={`relative group ${rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-100 cursor-pointer`}
                                    onClick={() => onRowClick(row)}
                                >
                                    {Object.entries(row).map(([key, cell], cellIndex) => (
                                        key !== 'id' && cell !== undefined && cell !== null && (
                                            <td
                                                key={`${rowIndex}-${cellIndex}`} // Utiliser une clé unique
                                                className="px-6 py-4 whitespace-nowrap text-center text-sm text-custom-1 group-hover:transform transition-transform duration-200"
                                            >
                                                {cell}
                                            </td>
                                        )
                                    ))}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Contrôles de pagination */}
            <div className="flex justify-center align-middle gap-12 items-center mt-2">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-2 bg-gray-200 text-gray-600 rounded-full hover:bg-gray-300 disabled:opacity-50 cursor-pointer"
                >
                    ←
                </button>
                <span className="text-sm text-custom-1">
                    Page {currentPage} sur {totalPages}
                </span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-2 bg-gray-200 text-gray-600 rounded-full hover:bg-gray-300 disabled:opacity-50 cursor-pointer"
                >
                    →
                </button>
            </div>
        </div>
    );
};
