import React from "react";
import Header from "../../layouts/header/Header";
import HospitalListForm from "../../components/HospitalListForm";
import NavBar from "../../layouts/nav/NavBar";

function AccountHospital({ ...props }) {
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
    ];
    return (
        <>
            <div className="mb-[40px]">
                <Header title="즐겨찾기 한 병원" />
            </div>

            <HospitalListForm hospitalList={hospitalExam} />
            <NavBar />
        </>
    );
}

export default AccountHospital;
