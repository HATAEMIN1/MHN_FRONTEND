import React, { useState } from "react";
import Modal from "./Modal";

function ModalManager({ children, modalContent }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            {typeof children === "function"
                ? children({ openModal })
                : children}
            {isModalOpen && (
                <Modal onClose={closeModal}>
                    {typeof modalContent === "function"
                        ? modalContent({ closeModal })
                        : modalContent}
                </Modal>
            )}
        </>
    );
}

export default ModalManager;
