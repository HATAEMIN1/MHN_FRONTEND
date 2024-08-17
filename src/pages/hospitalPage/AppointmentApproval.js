import React, { useEffect, useState } from "react";
import Header from "../../layouts/header/Header";
import DoctorNav from "../../layouts/nav/DoctorNav";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axiosInstance from "../../utils/axios";

function AppointmentApproval() {
    const [appointmentList, setAppointmentList] = useState(null);
    const [patchAppointmentList, setPatchAppointmentList] = useState(null);
    const loginState = useSelector((state) => state.userSlice);
    console.log(loginState);

    async function getAllAppointmentList() {
        try {
            const res = await axiosInstance.get(
                `/hospital/appointment?hospitalId=${loginState.hospital.id}`
            );
            console.log(res.data);
            setAppointmentList(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear().toString().slice(-2);
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        const hour = date.getHours();
        const ampm = hour >= 12 ? "오후" : "오전";
        const formattedHour = (hour % 12 || 12).toString().padStart(2, "0");

        // return `${year}년 ${month}월 ${day}일 / ${ampm} ${formattedHour}시`;
        return `${month}월 ${day}일 / ${ampm} ${formattedHour}시`;
    };

    async function requestApproval(appointmentId, status) {
        try {
            const res = await axiosInstance.put(
                `/hospital/appointment/statusmodi?id=${appointmentId}&status=${status}`
            );
            console.log(res.data);
            setPatchAppointmentList(res.data);
            // 전체 목록 다시 로드
            getAllAppointmentList();
        } catch (error) {
            console.log(error);
        }
    }

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
            {Array.isArray(appointmentList) ? (
                appointmentList.map((appointment) => (
                    <div
                        className={`border border-gray-600 rounded-md p-4 mt-8 ${
                            appointment.status === "PENDING"
                                ? "hover:border-blue-200 hover:shadow-md transition duration-300"
                                : ""
                        }`}
                    >
                        <div className="flex justify-between body2 text-sub-200">
                            {/* 병원 정보 시작 */}
                            <div className="flex flex-col gap-2 mb-2 w-3/4">
                                <p className="subtitle1 text-primary-300">
                                    <span className="body2 text-sub-100">
                                        이름 :{" "}
                                    </span>
                                    {appointment.member.name}
                                </p>
                                <p className="body2 text-sub-800">
                                    <span className="body2 text-sub-100">
                                        닉네임 :{" "}
                                    </span>
                                    {appointment.member.nickName}
                                </p>
                                <p className="body2 text-sub-800">
                                    <span className="body2 text-sub-100">
                                        연락처 :{" "}
                                    </span>
                                    {appointment.member.tel}
                                </p>
                                {/* <p className="body3 text-sub-800">
                                    <span className="body2 text-sub-100">
                                        예약일자 :{" "}
                                    </span>
                                    {appointment.appointmentDateTime}
                                </p> */}
                            </div>
                            {/* 병원 정보 종료  */}

                            {/* 요청 상태 시작 */}
                            <div className="flex gap-1 h-3 items-center">
                                <span
                                    className={`inline-block w-3 h-3 rounded-full ${appointment.status === "APPROVED" ? "bg-green-800" : appointment.status === "PENDING" ? "bg-yellow-500" : "bg-red-600"}`}
                                ></span>
                                <span
                                    className={`mini ${appointment.status === "APPROVED" ? "text-green-800" : appointment.status === "PENDING" ? "text-yellow-500" : "text-red-600"}`}
                                >
                                    {appointment.status === "APPROVED"
                                        ? "예약확정"
                                        : appointment.status === "PENDING"
                                          ? "수락대기"
                                          : "거절 완료"}
                                </span>
                            </div>
                            {/* 요청 상태 종료  */}
                        </div>

                        <div className="border-t border-dashed border-gray-700 flex justify-between pt-3">
                            {/* <p className="body2 text-primary-300">
                                가입{" "}
                                <span className="body3 text-gray-300 ml-1">
                                    {doctors.createdAt}
                                </span>
                            </p> */}
                            <p className="body3 text-sub-800">
                                <span className="body2 text-sub-100">
                                    예약일자 :{" "}
                                </span>
                                {formatDate(appointment.appointmentDateTime)}
                            </p>

                            {/* 버튼 시작 */}
                            <div className="flex gap-[4px]">
                                {appointment.status === "PENDING" && (
                                    <button
                                        className="mini py-[6px] px-[14px] rounded-md bg-primary-300 text-primary-400 hover:bg-sub-200"
                                        onClick={() =>
                                            requestApproval(
                                                appointment.id,
                                                "APPROVED"
                                            )
                                        }
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
                                        appointment.status !== "PENDING"
                                            ? "bg-gray-300 text-gray-600"
                                            : "bg-primary-300 text-primary-400 hover:bg-sub-200"
                                    }`}
                                    onClick={
                                        () =>
                                            requestApproval(
                                                appointment.id,
                                                "REJECTED"
                                            )
                                        //  PENDING -> REJECTED로 변경하는 로직
                                    }
                                    disabled={appointment.status !== "PENDING"}
                                >
                                    {appointment.status !== "PENDING"
                                        ? "처리완료"
                                        : "요청거절"}
                                </button>
                            </div>
                            {/* 버튼 종료  */}
                        </div>
                    </div>
                ))
            ) : (
                <p>예약 정보를 불러오는 중입니다...</p>
            )}
            <DoctorNav />
        </>
    );
}

export default AppointmentApproval;
