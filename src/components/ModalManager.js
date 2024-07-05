import React, { useState } from "react";
import Modal from "./Modal"; // 모달 컴포넌트를 임포트

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
            {isModalOpen && <Modal onClose={closeModal}>{modalContent}</Modal>}
        </>
    );
}

export default ModalManager;
