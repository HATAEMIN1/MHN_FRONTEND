import React from "react";
import NavBar from "../../layouts/nav/NavBar";
import Header from "../../layouts/header/Header";
import HospitalListForm from "../../components/Form/HospitalListForm";
import SearchInput from "../../components/search/SearchInput";
import { Link } from "react-router-dom";
import KakaoMapSearch from "../../components/kakaomap/KakaoMapSearch";

function HospitalMap() {
    const hospitalExam = [
        {
            name: "코드랩아카데미병원",
            address:
                "서울 금천구 가산디지털2로 144 현대테라타워 가산DK 20층ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ",
            location: "350m",
            tel: "02-123-4567",
        },
    ];
    return (
        <>
            <div className="mb-[10px]">
                <Header title="내 주변 병원" />
            </div>
            <div className="mb-[20px]">
                <SearchInput />
            </div>
            <div className="mb-[10px]">
                <KakaoMapSearch width="100%" height="550px" />
            </div>
            <div>
                <HospitalListForm hospitalList={hospitalExam} />
            </div>
            <NavBar />
        </>
    );
}

export default HospitalMap;
