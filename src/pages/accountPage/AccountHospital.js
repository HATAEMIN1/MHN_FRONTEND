import React, { useEffect, useState } from "react";
import Header from "../../layouts/header/Header";
import HospitalListForm from "../../components/Form/HospitalListForm";
import NavBar from "../../layouts/nav/NavBar";
import axiosInstance from "../../utils/axios";
import { useSelector } from "react-redux";

function AccountHospital() {
    const [accountHospitalInfo, setAccountHospitalInfo] = useState([]);
    const [hospitals, setHospitals] = useState([]);

    const loginState = useSelector((state) => {
        console.log(state.userSlice);
        console.log(state.userSlice.id);
        return state.userSlice;
    });

    useEffect(() => {
        const getAccountHospitalInfo = async () => {
            // if () {
            try {
                const response = await axiosInstance.get(
                    `/hospitals/account?memberId=${loginState.id}`
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
