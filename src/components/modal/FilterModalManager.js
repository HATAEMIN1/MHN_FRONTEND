import React, { useState } from "react";
import FilterModal from "./FilterModal";

function FilterModalManager({ modalOpen }) {
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
            {isModalOpen && <FilterModal onClose={closeModal} />}
        </>
    );
}

export default FilterModalManager;
