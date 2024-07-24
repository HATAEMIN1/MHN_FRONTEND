import React, { useState } from "react";

function SearchInput({ ...props }) {
    const [textData, setTextData] = useState("");
    const [searchData, setSearchData] = useState([]);

    const handleChange = (e) => {
        setTextData(e.target.value);
    };
    // console.log(textData);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (textData.trim() !== "") {
            setSearchData([textData]); // 새로운 배열로 교체
            setTextData("");
        }
    };

    console.log("textData:", textData);
    console.log("searchData:", searchData);

    return (
        <>
            <form action="">
                <div className="flex border-b py-[6px] px-[8px]">
                    <input
                        placeholder="검색어 입력"
                        className="w-full"
                        onChange={handleChange}
                        value={textData}
                    />
                    <button onClick={handleSubmit}>
                        <img src="/assets/images/searchIcon.svg" alt="검색" />
                    </button>
                </div>
            </form>
        </>
    );
}

export default SearchInput;
