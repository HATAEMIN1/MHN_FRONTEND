import React from "react";
import NavBar from "../../layouts/nav/NavBar";
import Header from "../../layouts/header/Header";
import HospitalListForm from "../../components/HospitalListForm";
import SearchInput from "../../components/SearchInput";
import { Link } from "react-router-dom";

function HospitalMap() {
    const hospitalExam = [
        {
            name: "코드랩아카데미병원",
            address: "서울 금천구 가산디지털2로 144 현대테라타워 가산DK 20층",
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
                <img
                    src="/assets/images/testMap.svg"
                    style={{ width: "90%", margin: "auto" }}
                />
            </div>
            <div>
                <HospitalListForm hospitalList={hospitalExam} />
            </div>
            <NavBar />
        </>
    );
}

export default HospitalMap;
