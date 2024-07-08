import React from "react";

function FilterModal({ ...props }) {
    function handleOutsideClick(e) {
        if (e.target.classList.contains("modal-overlay")) {
            props.onClose();
        }
    }

    const modalContainerStyle = {
        backgroundColor: "white",
        height: "33vh",
    };

    return (
        <div
            className="w-full fixed inset-0 bg-black bg-opacity-50 z-20 flex items-end justify-center modal-overlay"
            onClick={handleOutsideClick}
        >
            <div
                style={modalContainerStyle}
                className="w-full sm:w-[576px] z-50 rounded-t-[12px] px-[16px]"
            >
                <ul className="flex flex-col justify-around items-center h-full">
                    <li
                        className="text-center w-full cursor-pointer"
                        onClick={() => {
                            alert("마자이거?");
                        }}
                    >
                        최신순
                    </li>
                    <li
                        className="text-center cursor-pointer w-full"
                        onClick={() => {
                            alert("조아요?");
                        }}
                    >
                        좋아요순
                    </li>
                    <li
                        className="text-center cursor-pointer w-full"
                        onClick={() => {
                            alert("오래됏음?");
                        }}
                    >
                        오래된순
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default FilterModal;
