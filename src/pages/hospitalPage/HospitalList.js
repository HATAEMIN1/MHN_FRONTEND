import React from "react";
import Header from "../../layouts/header/Header";
import NavBar from "../../layouts/nav/NavBar";
import HospitalListForm from "../../components/HospitalListForm";
import SearchInput from "../../components/SearchInput";

function HospitalList() {
    const hospitalExam = [
        {
            name: "코드랩아카데미병원",
            address: "서울 금천구 가산디지털2로 144 현대테라타워 가산DK 20층",
            location: "350m",
            tel: "02-123-4567",
        },
        {
            name: "코드랩아카데미병원11111",
            address: "서울 금천구 가산디지털2로 144 현대테라타워 가산DK 20층",
            location: "350m",
            tel: "02-123-4567",
        },
        {
            name: "코드랩아카데미병원22222",
            address: "서울 금천구 가산디지털2로 144 현대테라타워 가산DK 20층",
            location: "350m",
            tel: "02-123-4567",
        },
        {
            name: "코드랩아카데미병원33333",
            address: "서울 금천구 가산디지털2로 144 현대테라타워 가산DK 20층",
            location: "350m",
            tel: "02-123-4567",
        },
        {
            name: "코드랩아카데미병원44444",
            address: "서울 금천구 가산디지털2로 144 현대테라타워 가산DK 20층",
            location: "350m",
            tel: "02-123-4567",
        },
        {
            name: "코드랩아카데미병원55555",
            address: "서울 금천구 가산디지털2로 144 현대테라타워 가산DK 20층",
            location: "350m",
            tel: "02-123-4567",
        },
    ];
    return (
        <>
            <div className="mb-[40px]">
                <Header title="내 주변 병원" />
            </div>
            <div className="mb-[20px]">
                <SearchInput />
            </div>
            <div className="bg-primary-300 text-primary-400 text-center mb-[20px] px-[8px] py-[8px] mini rounded-[4px]">
                병원 상황에 따라 운영시간이 다를 수 있습니다.
            </div>
            <p className="mb-[16px] mini text-sub-100">
                nn개의 병원이 검색되었습니다.
            </p>
            <hr className="mb-[16px]" />
            <HospitalListForm hospitalList={hospitalExam} />
            <NavBar />
        </>
    );
}

export default HospitalList;
