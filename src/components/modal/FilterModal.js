// FilterModal.js
import React from "react";

function FilterModal({ closeModal }) {
    return (
        <div>
            <h2>Filter Options</h2>
            <button onClick={closeModal}>Close</button>
            {/* 필터 옵션을 여기에 추가하세요 */}
        </div>
    );
}

export default FilterModal;
