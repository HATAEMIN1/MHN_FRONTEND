import React, { useState } from "react";
import SearchModal from "./SearchModal";

function SearchModalManager({ modalOpen, onFilterChange, ...props }) {
    // 기존 props 유지
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            {React.cloneElement(modalOpen, { onClick: openModal })}
            {isModalOpen && (
                <SearchModal
                    onClose={closeModal}
                    onFilterChange={onFilterChange}
                    {...props}
                /> // 기존 props 유지
            )}
        </>
    );
}

export default SearchModalManager;
