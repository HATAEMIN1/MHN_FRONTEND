// Modal.jsx
import React from "react";

function Modal({ onClose, children }) {
    function handleOutsideClick(e) {
        if (e.target.classList.contains("modal-overlay")) {
            onClose();
        }
    }

    const modalContainerStyle = {
        borderRadius: "10px",
        width: "330px",
        height: "200px",
        backgroundColor: "white",
        padding: "20px",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    };

    const closeButtonStyle = {
        position: "absolute",
        top: "10px",
        right: "10px",
        color: "black",
        fontWeight: "bold",
        padding: "2px 5px",
        borderRadius: "50%",
        fontSize: "12px",
        cursor: "pointer",
        backgroundColor: "transparent",
        border: "none",
    };

    const modalContentStyle = {
        fontSize: "20px",
        fontWeight: "bold",
        textAlign: "center",
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center modal-overlay"
            onClick={handleOutsideClick}
        >
            <div style={modalContainerStyle}>
                <button onClick={onClose} style={closeButtonStyle}>
                    ×
                </button>
                <div className="modal-content" style={modalContentStyle}>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Modal;
