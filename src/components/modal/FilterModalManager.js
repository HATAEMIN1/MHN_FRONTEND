import React, { useState } from "react";
import FilterModal from "./FilterModal";

function FilterModalManager({ ...props }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const closeModal = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            <FilterModal onClose={closeModal} />
        </>
    );
}

export default FilterModalManager;
