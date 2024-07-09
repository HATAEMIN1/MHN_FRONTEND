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
            {React.cloneElement(modalOpen, {
                handleClick: () => {
                    openModal();
                    if (modalOpen.props.handleClick) {
                        modalOpen.props.handleClick();
                    }
                },
            })}
            {isModalOpen && <FilterModal onClose={closeModal} />}
        </>
    );
}

export default FilterModalManager;
