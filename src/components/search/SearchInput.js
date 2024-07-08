import React from "react";

function SearchInput() {
    return (
        <>
            <div className="flex border-b py-[6px] px-[8px]">
                <input placeholder="검색어 입력" className="w-full " />
                <img src="/assets/images/searchIcon.svg" />
            </div>
        </>
    );
}

export default SearchInput;
