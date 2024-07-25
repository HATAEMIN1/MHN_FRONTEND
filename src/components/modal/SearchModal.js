import React, { useState } from "react";
import SearchInputForDoctor from "../search/SearchInputForDoctor";
import HospitalListFormForDoctor from "../Form/HospitalListFormForDoctor";

function SearchModal({ onClose, onFilterChange, ...props }) {
    const [hospitalList, setHospitalList] = useState([]);

    function handleOutsideClick(e) {
        if (e.target.classList.contains("modal-overlay")) {
            onClose();
        }
    }

    const modalContainerStyle = {
        backgroundColor: "white",
        height: "85vh",
        display: "flex",
        flexDirection: "column",
    };

    const handleHospitalListUpdate = (newList) => {
        setHospitalList(newList);
    };

    return (
        <div
            className="w-full fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center modal-overlay "
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
                <div className="my-[30px]">
                    <SearchInputForDoctor
                        onHospitalListUpdate={handleHospitalListUpdate}
                    />
                </div>
                <div
                    style={{ overflowY: "auto", flexGrow: 1 }}
                    className="no-scrollbar"
                >
                    <HospitalListFormForDoctor hospitalList={hospitalList} />
                </div>
            </div>
        </div>
    );
}

export default SearchModal;
