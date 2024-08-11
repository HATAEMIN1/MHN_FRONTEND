import React, { useEffect, useMemo, useState } from "react";
import Header from "../../layouts/header/Header";
import AdminNav from "../../layouts/nav/AdminNav";
import axiosInstance from "../../utils/axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Approval() {
    const [doctorList, setDoctorList] = useState(null);
    const loginState = useSelector((state) => state.userSlice);

    // 요청 상태 변경 .
    const handleApprove = (id) => {
        setDoctorList(
            doctorList.map((doctorList) =>
                doctorList.id === id
                    ? { ...doctorList, doctorStatus: "FULFILLED" }
                    : doctorList
            )
        );
    };

    // 수락 완료된 병원 하단으로 이동, 날짜 정렬
    // const sortedHospitals = useMemo(() => {
    //     return [...doctorList].sort((a, b) => {
    //         if (a.status === "FULFILLED" && b.status !== "FULFILLED") return 1;
    //         if (a.status !== "FULFILLED" && b.status === "FULFILLED") return -1;
    //         return new Date(b.createdAt) - new Date(a.createdAt);
    //     });
    // }, [hospitals]);

    async function getAllDoctorList() {
        try {
            const res = await axiosInstance.get("/doctors/register/list");
            console.log(res.data);
            setDoctorList(res.data);
        } catch (error) {
            console.log(error);
        }
    }
    async function requestApproval(doctorId) {
        try {
            const res = await axiosInstance.put(
                `/doctors/register/statusmodi?id=${doctorId}`
            );
            console.log(res.data);
            setDoctorList(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllDoctorList();
    }, []);

    return (
        <>
            {loginState &&
            loginState.memberTypeList &&
            loginState.memberTypeList[0] === "ADMIN" ? (
                <>
                    <Header title="가입승인" />
                    <form>
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
                                    return (
                                        new Date(b.createdAt) -
                                        new Date(a.createdAt)
                                    );
                                })
                                // 정렬로직 추가 end, 밑으로는 map
                                .map((doctors) => (
                                    <div
                                        className={`border border-gray-600 rounded-md p-4 mt-8 ${
                                            doctors.doctorStatus === "PENDING"
                                                ? "hover:border-blue-200 hover:shadow-md transition duration-500"
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
                                                    className={`inline-block w-2 h-2 rounded-full ${doctors.doctorStatus === "FULFILLED" ? "bg-sub-100" : "bg-primary-200"}`}
                                                ></span>
                                                <span
                                                    className={`mini ${doctors.doctorStatus === "FULFILLED" ? "text-primary-300" : "text-primary-200"}`}
                                                >
                                                    {doctors.doctorStatus ===
                                                    "FULFILLED"
                                                        ? "종료"
                                                        : "요청"}
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
                                            <button
                                                className={`mini py-[6px] px-[14px] rounded-md ${
                                                    doctors.status ===
                                                    "FULFILLED"
                                                        ? "bg-gray-300 text-gray-600"
                                                        : "bg-primary-300 text-primary-400 hover:bg-sub-200"
                                                }`}
                                                onClick={() =>
                                                    requestApproval(doctors.id)
                                                }
                                                disabled={
                                                    doctors.doctorStatus ===
                                                    "FULFILLED"
                                                }
                                            >
                                                {doctors.doctorStatus ===
                                                "FULFILLED"
                                                    ? "수락완료"
                                                    : "수락"}
                                            </button>
                                            {/* 버튼 종료  */}
                                        </div>
                                    </div>
                                ))}
                    </form>
                    <AdminNav />
                </>
            ) : (
                <>
                    <p>잘못된접근입니다</p>
                    <Link to="/users/login">
                        <button>로그인 페이지로</button>
                    </Link>
                </>
            )}

            {/* <AdminNav /> */}
        </>
    );
}

export default Approval;
