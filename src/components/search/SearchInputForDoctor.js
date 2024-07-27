import React, { useState } from "react";
import axiosInstance from "../../utils/axios";

function SearchInputForDoctor({ ...props }) {
    const [textData, setTextData] = useState("");
    const [hospitalList, setHospitalList] = useState([]);

    const handleChange = (e) => {
        setTextData(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleSearch();
        }
    };

    const handleSearch = async () => {
        if (textData.trim() === "") return;

        console.log("검색 데이터:", textData);
        try {
            const response = await axiosInstance.get(
                `/hospitals/search?name=${encodeURIComponent(textData)}`
            );
            console.log(response.data);
            setHospitalList(response.data);
            props.onHospitalListUpdate(response.data);
        } catch (error) {
            console.error("병원 정보를 가져오는 중 오류 발생:", error);
        }
    };

    // console.log(hospitalList);

    return (
        <div className="flex border-b py-[6px] px-[8px]">
            <input
                placeholder="검색어 입력"
                className="w-full"
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                value={textData}
            />
            <button type="button" onClick={handleSearch}>
                <img src="/assets/images/searchIcon.svg" alt="검색" />
            </button>
        </div>
    );
}

export default SearchInputForDoctor;
