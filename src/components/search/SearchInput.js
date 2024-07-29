import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchInput({ handleSearch, ...props }) {
    const [textData, setTextData] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setTextData(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (textData.trim() !== "") {
            // setTextData("");
            if (handleSearch && typeof handleSearch === "function") {
                handleSearch([textData]); // 부모 컴포넌트로 searchData 전달
            }
            navigate(`/hospitals/search?name=${[textData]}`);
        }
    };

    console.log("textData:", textData);

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="flex border-b py-[6px] px-[8px]">
                    <input
                        placeholder="검색어 입력"
                        className="w-full"
                        onChange={handleChange}
                        value={textData}
                    />
                    <button type="submit">
                        <img src="/assets/images/searchIcon.svg" alt="검색" />
                    </button>
                </div>
            </form>
        </>
    );
}

export default SearchInput;
