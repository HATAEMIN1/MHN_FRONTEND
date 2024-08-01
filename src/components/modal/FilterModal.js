import React from "react";

function FilterModal({ onClose, onFilterChange, ...props }) {
    // 기존 props 유지
    function handleOutsideClick(e) {
        if (e.target.classList.contains("modal-overlay")) {
            onClose();
        }
    }

    const modalContainerStyle = {
        backgroundColor: "white",
        height: "33vh",
    };

    const handleFilterSelection = (filter) => {
        // 수정된 부분: 필터 선택 함수 추가
        onFilterChange(filter);
        onClose();
    };

    return (
        <div
            className="w-full fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center modal-overlay"
            onClick={handleOutsideClick}
            style={{ zIndex: 999 }}
        >
            <div
                style={{
                    ...modalContainerStyle,
                    zIndex: 1000,
                }}
                className="w-full sm:w-[576px] rounded-t-[12px] px-[16px]"
            >
                <ul className="flex flex-col justify-around items-center h-full">
                    <li
                        className="text-center w-full cursor-pointer text-primary-300 body2"
                        onClick={() => handleFilterSelection("latest")} // 수정된 부분: 최신순 필터 선택 시 동작
                    >
                        최신순
                    </li>
                    <li
                        className="text-center cursor-pointer w-full text-primary-300 body2"
                        onClick={() => handleFilterSelection("likes")} // 수정된 부분: 좋아요순 필터 선택 시 동작
                    >
                        좋아요순
                    </li>
                    <li
                        className="text-center cursor-pointer w-full text-primary-300 body2"
                        onClick={() => handleFilterSelection("oldest")} // 수정된 부분: 오래된순 필터 선택 시 동작
                    >
                        오래된순
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default FilterModal;
