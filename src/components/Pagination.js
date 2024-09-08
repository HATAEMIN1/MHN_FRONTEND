import React, { useState } from "react";

const Pagination = ({ items, itemsPerPage }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(items.length / itemsPerPage);

    const getCurrentItems = () => {
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        return items.slice(indexOfFirstItem, indexOfLastItem);
    };

    return (
        <div>
            {getCurrentItems().map((item, index) => (
                <div key={index}>{item}</div>
            ))}
            <div>
                <button
                    onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                >
                    이전
                </button>
                <span>
                    {currentPage} / {totalPages}
                </span>
                <button
                    onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                >
                    다음
                </button>
            </div>
        </div>
    );
};

export default Pagination;
