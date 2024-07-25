import React, { useEffect, useState } from "react";
import Header from "../../layouts/header/Header";
import NavBar from "../../layouts/nav/NavBar";
import HospitalListForm from "../../components/Form/HospitalListForm";
import SearchInput from "../../components/search/SearchInput";
import axiosInstance from "../../utils/axios";
import { useSearchParams } from "react-router-dom";

function HospitalSearch() {
    const [hospitalList, setHospitalList] = useState([]);
    const [searchData, setSearchData] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();

    const name = searchParams.get("name"); // limit 값 변수에 저장

    const handleSearch = (searchData) => {
        setSearchData(searchData);
    };
    const fetchHospitals = async () => {
        try {
            const response = await axiosInstance.get(
                `/hospitals/search?name=${name}`
            );
            console.log(response);
            setHospitalList(response.data);
        } catch (error) {
            console.error("병원 정보를 가져오는 중 오류 발생:", error);
        }
    };

    useEffect(() => {
        fetchHospitals();
    }, [searchData]);
    console.log(hospitalList);
    return (
        <>
            <div className="mb-[40px]">
                <Header title="내 주변 병원" />
            </div>
            <div className="mb-[20px]">
                <SearchInput handleSearch={handleSearch} />
            </div>
            <div className="bg-primary-300 text-primary-400 text-center mb-[20px] px-[8px] py-[8px] mini rounded-[4px]">
                병원 상황에 따라 운영시간이 다를 수 있습니다.
            </div>
            <p className="mb-[16px] mini text-sub-100">
                {hospitalList.length}개의 병원이 검색되었습니다.
            </p>
            <hr className="mb-[16px]" />
            <HospitalListForm hospitalList={hospitalList} />
            <NavBar />
        </>
    );
}

export default HospitalSearch;
