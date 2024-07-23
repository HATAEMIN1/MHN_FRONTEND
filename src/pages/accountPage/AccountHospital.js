import React, { useEffect, useState } from "react";
import Header from "../../layouts/header/Header";
import HospitalListForm from "../../components/Form/HospitalListForm";
import NavBar from "../../layouts/nav/NavBar";
import axiosInstance from "../../utils/axios";

function AccountHospital() {
    // const hospitalExam = [
    //     {
    //         name: "코드랩아카데미병원",
    //         address: "서울 금천구 가산디지털2로 144 현대테라타워 가산DK 20층",
    //         location: "350m",
    //         tel: "02-123-4567",
    //     },
    //     {
    //         name: "코드랩아카데미병원11111",
    //         address:
    //             "서울 금천구 가산디지털2로 144 현대테라타워 가산DK 20층ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ",
    //         location: "350m",
    //         tel: "02-123-4567",
    //     },
    //     {
    //         name: "코드랩아카데미병원22222",
    //         address: "서울 금천구 가산디지털2로 144 현대테라타워 가산DK 20층",
    //         location: "350m",
    //         tel: "02-123-4567",
    //     },
    // ];
    const [accountHospitalInfo, setAccountHospitalInfo] = useState([]);
    const [hospitals, setHospitals] = useState([]);
    useEffect(() => {
        const getAccountHospitalInfo = async () => {
            // if () {
            try {
                const response = await axiosInstance.get(
                    // `/hospitals/account?memberId=${로그인 유저 아이디 들어가야함}`
                    `/hospitals/account?memberId=4`
                );
                setAccountHospitalInfo(response.data);
                console.log(response);
                console.log(response.data);
            } catch (error) {
                console.error("병원 정보를 가져오는 중 오류 발생:", error);
            }
            // }
        };

        getAccountHospitalInfo();
    }, []);

    // accountHospitalInfo.map((item) =>
    //     // setHospitals(item.hospital)
    //     console.log(item.hospital)
    // );
    useEffect(() => {
        if (accountHospitalInfo.length > 0) {
            const hospitalData = accountHospitalInfo.map(
                (item) => item.hospital
            );
            setHospitals(hospitalData);
        }
    }, [accountHospitalInfo]);
    console.log(hospitals);
    return (
        <>
            <div className="mb-[40px]">
                <Header title="즐겨찾기 한 병원" />
            </div>

            <HospitalListForm hospitalList={hospitals} />
            <NavBar />
        </>
    );
}

export default AccountHospital;
