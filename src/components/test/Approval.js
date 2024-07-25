import React, { useMemo, useState } from "react";
import Header from "../../layouts/header/Header";
import AdminNav from "../../layouts/nav/AdminNav";

function Approval() {
    const [hospitals, setHospitals] = useState([
        {
            id: 1,
            name: "코드랩 동물병원",
            email: "sjhda00@naver.com",
            address: "서울 금천구 가산디지털2로 144 현대테라타워 가산dK 20층",
            tell: "02-111-1111",
            // createdAt: new Date("2024.07.22"),
            createdAt: "2024.07.22",
            status: "pending",
        },
        {
            id: 2,
            name: "이노24시 동물병원",
            email: "djahdja@naver.com",
            address: "서울 금천구 가산디지털2로 144 현대테라타워 가산dK 20층",
            tell: "02-222-2222",
            // createdAt: new Date("2024.07.18"),
            createdAt: "2024.07.18",
            status: "pending",
        },
        {
            id: 3,
            name: "n동물의료센터",
            email: "oetieo@naver.com",
            address: "서울 금천구 가산디지털2로 144 현대테라타워 가산dK 20층",
            tell: "02-333-3333",
            // createdAt: new Date("2024.07.16"),
            createdAt: "2024.07.16",
            status: "pending",
        },
        {
            id: 4,
            name: "아이이 동물병원",
            email: "bcnkcd@naver.com",
            address: "서울 금천구 가산디지털2로 144 현대테라타워 가산dK 20층",
            tell: "02-444-4444",
            // createdAt: new Date("2024.07.11"),
            createdAt: "2024.07.11",
            status: "pending",
        },
        {
            id: 5,
            name: "가나다라 동물병원",
            email: "queiqir@naver.com",
            address: "서울 금천구 가산디지털2로 144 현대테라타워 가산dK 20층",
            tell: "02-555-5555",
            // createdAt: new Date("2024.07.03"),
            createdAt: "2024.07.03",
            status: "pending",
        },
        {
            id: 6,
            name: "가디24시 동물병원",
            email: "vbjkwkh@naver.com",
            address: "서울 금천구 가산디지털2로 144 현대테라타워 가산dK 20층",
            tell: "02-666-6666",
            // createdAt: new Date("2024.06.30"),
            createdAt: "2024.06.30",
            status: "pending",
        },
        {
            id: 7,
            name: "동동 동물병원",
            email: "fhajha@naver.com",
            address: "서울 금천구 가산디지털2로 144 현대테라타워 가산dK 20층",
            tell: "02-777-7777",
            // createdAt: new Date("2024.06.24"),
            createdAt: "2024.06.24",
            status: "pending",
        },
    ]);

    // const [currentPage, setCurrentPage] = useState(1);
    // const [filter, setFilter] = useState("all");
    // const itemsPerPage = 5;

    // 요청 상태 변경
    const handleApprove = (id) => {
        setHospitals(
            hospitals.map((hospital) =>
                hospital.id === id
                    ? { ...hospital, status: "approved" }
                    : hospital
            )
        );
    };

    // const sortedAndFilteredHospitals = useMemo(() => {
    //     return hospitals
    //         .filter((hospital) => {
    //             if (filter === "all") return true;
    //             return hospital.status === filter;
    //         })
    //         .sort((a, b) => {
    //             if (a.status === b.status) {
    //                 return b.createdAt - a.createdAt; // 최신 날짜 순
    //             }
    //             return a.status === "pending" ? -1 : 1; // pending이 먼저
    //         });
    // }, [hospitals, filter]);

    // const pageCount = Math.ceil(
    //     sortedAndFilteredHospitals.length / itemsPerPage
    // );
    // const currentHospitals = sortedAndFilteredHospitals.slice(
    //     (currentPage - 1) * itemsPerPage,
    //     currentPage * itemsPerPage
    // );

    return (
        <>
            <Header title="가입승인" />
            {/* <div className="mb-4">
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="p-2 border rounded"
                >
                    <option value="all">전체</option>
                    <option value="pending">요청</option>
                    <option value="approved">종료</option>
                </select>
            </div> */}
            <form>
                {/* {currentHospitals.map((hospital) => (
                    <div
                        key={hospital.id}
                        className="border border-gray-600 rounded-md p-4 mt-8 hover:border-blue-200 hover:shadow-md transition duration-500"
                    > */}
                {hospitals.map((hospital) => (
                    <div
                        key={hospital.id}
                        className="border border-gray-600 rounded-md p-4 mt-8 hover:border-blue-200 hover:shadow-md transition duration-500"
                    >
                        {/* 병원 정보  */}
                        <div className="flex justify-between body2 text-sub-200">
                            <div className="flex flex-col gap-2 mb-2 w-3/4">
                                <p className="subtitle1 text-primary-300">
                                    {hospital.name}
                                </p>
                                <p className="body2 text-sub-200">
                                    {hospital.email}
                                </p>
                                <p className="body2 text-sub-100">
                                    {hospital.tell}
                                </p>
                                <p className="body3 tetx-gray-600">
                                    {hospital.address}
                                </p>
                            </div>
                            {/* 요청 상태 시작 */}
                            <div className="flex gap-1 h-3 items-center">
                                <span
                                    className={`inline-block w-2 h-2 rounded-full ${hospital.status === "approved" ? "bg-primary-300" : "bg-primary-200"}`}
                                ></span>
                                <span
                                    className={`mini ${hospital.status === "approved" ? "text-primary-300" : "text-primary-200"}`}
                                >
                                    {hospital.status === "approved"
                                        ? "종료"
                                        : "요청"}
                                </span>
                            </div>
                            {/* 요청 상태 종료  */}
                        </div>

                        <div className="border-t border-dashed border-gray-700 flex justify-between pt-3">
                            <p className="body2 text-primary-300">
                                가입{" "}
                                <span className="body3 text-gray-300">
                                    {hospital.createdAt}
                                    {/* {hospital.createdAt.toLocaleDateString(
                                                "ko-KR",
                                                {
                                                    year: "numeric",
                                                    month: "2-digit",
                                                    day: "2-digit",
                                                }
                                            )} */}
                                </span>
                            </p>

                            <button
                                className={`mini py-[6px] px-[14px] rounded-md ${
                                    hospital.status === "approved"
                                        ? "bg-gray-300 text-gray-600"
                                        : "bg-primary-300 text-primary-400 hover:bg-sub-200"
                                }`}
                                onClick={() => handleApprove(hospital.id)}
                                disabled={hospital.status === "approved"}
                            >
                                {hospital.status === "approved"
                                    ? "수락완료"
                                    : "수락"}
                            </button>
                        </div>
                    </div>
                ))}
                {/* </div>
                ))} */}
            </form>
            {/* <div className="mt-4 flex justify-center gap-2">
                <button
                    onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                >
                    이전
                </button>
                <span className="px-4 py-2">
                    {currentPage} / {pageCount}
                </span>
                <button
                    onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, pageCount))
                    }
                    disabled={currentPage === pageCount}
                    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                >
                    다음
                </button>
            </div> */}

            <AdminNav />
        </>
    );
}

export default Approval;
