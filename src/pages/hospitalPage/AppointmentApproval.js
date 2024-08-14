import React, { useEffect, useState } from "react";
import Header from "../../layouts/header/Header";
import DoctorNav from "../../layouts/nav/DoctorNav";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axiosInstance from "../../utils/axios";

function AppointmentApproval() {
    const [doctorList, setDoctorList] = useState(null);
    const loginState = useSelector((state) => state.userSlice);
    console.log(loginState);

    async function getAllAppointmentList() {
        try {
            const res = await axiosInstance.get("/doctors/register/list");
            console.log(res.data);
            setDoctorList(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    // async function requestApproval(doctorId) {
    //     try {
    //         const res = await axiosInstance.put(
    //             `/doctors/register/statusmodi?id=${doctorId}`
    //         );
    //         console.log(res.data);
    //         setDoctorList(res.data);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    useEffect(() => {
        getAllAppointmentList();
    }, []);

    // loginState가 없거나 doctorStatus가 PENDING이면 아무것도 렌더링하지 않습니다.
    if (!loginState.hospital || loginState.doctorStatus === "PENDING") {
        return (
            <>
                <p>잘못된접근입니다</p>
                <Link to="/doctors/login">
                    <button className="font-bold">로그인 페이지로</button>
                </Link>
            </>
        );
    }
    return (
        <>
            <Header title="예약 관리 페이지" />
            {doctorList &&
                // 정렬 로직 추가 start
                [...doctorList]
                    .sort((a, b) => {
                        if (
                            a.doctorStatus === "FULFILLED" &&
                            b.doctorStatus !== "FULFILLED"
                        )
                            return 1;
                        if (
                            a.doctorStatus !== "FULFILLED" &&
                            b.doctorStatus === "FULFILLED"
                        )
                            return -1;
                        return new Date(b.createdAt) - new Date(a.createdAt);
                    })
                    // 정렬로직 추가 end, 밑으로는 map
                    .map((doctors) => (
                        <div
                            className={`border border-gray-600 rounded-md p-4 mt-8 ${
                                doctors.doctorStatus === "PENDING"
                                    ? "hover:border-blue-200 hover:shadow-md transition duration-300"
                                    : ""
                            }`}
                        >
                            <div className="flex justify-between body2 text-sub-200">
                                {/* 병원 정보 시작 */}
                                <div className="flex flex-col gap-2 mb-2 w-3/4">
                                    <p className="subtitle1 text-primary-300">
                                        {doctors.hospital.name}
                                    </p>
                                    <p className="body2 text-sub-100">
                                        {doctors.email}
                                    </p>
                                    <p className="body2 text-sub-800">
                                        {doctors.hospital.phone}
                                    </p>
                                    <p className="body3 text-gray-800">
                                        {doctors.hospital.address}
                                    </p>
                                </div>
                                {/* 병원 정보 종료  */}

                                {/* 요청 상태 시작 */}
                                <div className="flex gap-1 h-3 items-center">
                                    <span
                                        className={`inline-block w-3 h-3 rounded-full ${doctors.doctorStatus === "APPROVED" ? "bg-green-800" : doctors.doctorStatus === "PENDING" ? "bg-yellow-500" : "bg-red-600"}`}
                                    ></span>
                                    <span
                                        className={`mini ${doctors.doctorStatus === "APPROVED" ? "text-green-800" : doctors.doctorStatus === "PENDING" ? "text-yellow-500" : "text-red-600"}`}
                                    >
                                        {doctors.doctorStatus === "APPROVED"
                                            ? "예약확정"
                                            : doctors.doctorStatus === "PENDING"
                                              ? "수락대기"
                                              : "거절 완료"}
                                    </span>
                                </div>
                                {/* 요청 상태 종료  */}
                            </div>

                            <div className="border-t border-dashed border-gray-700 flex justify-between pt-3">
                                <p className="body2 text-primary-300">
                                    가입{" "}
                                    <span className="body3 text-gray-300 ml-1">
                                        {doctors.createdAt}
                                    </span>
                                </p>

                                {/* 버튼 시작 */}
                                <div className="flex gap-[4px]">
                                    {doctors.doctorStatus === "PENDING" && (
                                        <button
                                            className="mini py-[6px] px-[14px] rounded-md bg-primary-300 text-primary-400 hover:bg-sub-200"
                                            // onClick={() => requestApproval(doctors.id)}
                                            // PENDING -> APPROVED로 변경하는 로직
                                        >
                                            요청수락
                                        </button>
                                    )}

                                    {/* <button
                                        className={`mini py-[6px] px-[14px] rounded-md ${
                                            doctors.doctorStatus ===
                                                "APPROVED" ||
                                            doctors.doctorStatus === "REJECTED"
                                                ? "bg-gray-300 text-gray-600"
                                                : "bg-primary-300 text-primary-400 hover:bg-sub-200"
                                        }`} */}
                                    <button
                                        className={`mini py-[6px] px-[14px] rounded-md ${
                                            doctors.doctorStatus !== "PENDING"
                                                ? "bg-gray-300 text-gray-600"
                                                : "bg-primary-300 text-primary-400 hover:bg-sub-200"
                                        }`}
                                        // onClick={() =>
                                        //     requestApproval(doctors.id)
                                        //      PENDING -> REJECTED로 변경하는 로직
                                        // }
                                        disabled={
                                            doctors.doctorStatus !== "PENDING"
                                        }
                                    >
                                        {doctors.doctorStatus !== "PENDING"
                                            ? "처리완료"
                                            : "요청거절"}
                                    </button>
                                </div>
                                {/* 버튼 종료  */}
                            </div>
                        </div>
                    ))}
            <DoctorNav />
        </>
    );
}

export default AppointmentApproval;
