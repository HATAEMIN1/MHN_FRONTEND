import React, { useState } from "react";
import SearchModal from "./SearchModal";

function SearchModalManager({ modalOpen, ...props }) {
    // 기존 props 유지
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        console.log("9번 들어옴");
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            {React.cloneElement(modalOpen, { onClick: openModal })}
            {isModalOpen && (
                <div className="fixed inset-0 z-50">
                    <SearchModal
                        onClose={closeModal}
                        {...props}
                        setGetHospitalId={props.setGetHospitalId}
                    />{" "}
                </div>
            )}
        </>
    );
}

export default SearchModalManager;
