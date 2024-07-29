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
                <div className="fixed inset-0 z-50">
                    <Modal onClose={closeModal}>
                        {typeof modalContent === "function"
                            ? modalContent({ closeModal })
                            : modalContent}
                    </Modal>
                </div>
            )}
        </>
    );
}

export default ModalManager;
