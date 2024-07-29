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
            createdAt: "2024.07.22",
            status: "pending",
        },
        {
            id: 2,
            name: "이노24시 동물병원",
            email: "djahdja@naver.com",
            address: "서울 금천구 가산디지털2로 144 현대테라타워 가산dK 20층",
            tell: "02-222-2222",
            createdAt: "2024.07.18",
            status: "pending",
        },
        {
            id: 3,
            name: "n동물의료센터",
            email: "oetieo@naver.com",
            address: "서울 금천구 가산디지털2로 144 현대테라타워 가산dK 20층",
            tell: "02-333-3333",
            createdAt: "2024.07.16",
            status: "pending",
        },
        {
            id: 4,
            name: "아이이 동물병원",
            email: "bcnkcd@naver.com",
            address: "서울 금천구 가산디지털2로 144 현대테라타워 가산dK 20층",
            tell: "02-444-4444",
            createdAt: "2024.07.11",
            status: "pending",
        },
        {
            id: 5,
            name: "가나다라 동물병원",
            email: "queiqir@naver.com",
            address: "서울 금천구 가산디지털2로 144 현대테라타워 가산dK 20층",
            tell: "02-555-5555",
            createdAt: "2024.07.03",
            status: "pending",
        },
        {
            id: 6,
            name: "가디24시 동물병원",
            email: "vbjkwkh@naver.com",
            address: "서울 금천구 가산디지털2로 144 현대테라타워 가산dK 20층",
            tell: "02-666-6666",
            createdAt: "2024.06.30",
            status: "pending",
        },
        {
            id: 7,
            name: "동동 동물병원",
            email: "fhajha@naver.com",
            address: "서울 금천구 가산디지털2로 144 현대테라타워 가산dK 20층",
            tell: "02-777-7777",
            createdAt: "2024.06.24",
            status: "pending",
        },
    ]);

    // 요청 상태 변경 .
    const handleApprove = (id) => {
        setHospitals(
            hospitals.map((hospital) =>
                hospital.id === id
                    ? { ...hospital, status: "approved" }
                    : hospital
            )
        );
    };

    // 수락 완료된 병원 하단으로 이동, 날짜 정렬
    const sortedHospitals = useMemo(() => {
        return [...hospitals].sort((a, b) => {
            if (a.status === "approved" && b.status !== "approved") return 1;
            if (a.status !== "approved" && b.status === "approved") return -1;
            return new Date(b.createdAt) - new Date(a.createdAt);
        });
    }, [hospitals]);

    return (
        <>
            <Header title="가입승인" />
            <form>
                {sortedHospitals.map((hospital) => (
                    <div
                        key={hospital.id}
                        className={`border border-gray-600 rounded-md p-4 mt-8 ${
                            hospital.status === "pending"
                                ? "hover:border-blue-200 hover:shadow-md transition duration-500"
                                : ""
                        }`}
                    >
                        <div className="flex justify-between body2 text-sub-200">
                            {/* 병원 정보 시작 */}
                            <div className="flex flex-col gap-2 mb-2 w-3/4">
                                <p className="subtitle1 text-primary-300">
                                    {hospital.name}
                                </p>
                                <p className="body2 text-sub-100">
                                    {hospital.email}
                                </p>
                                {/* <p className="body2 text-sub-100">
                                    {hospital.tell}
                                </p>
                                <p className="body3 text-gray-800">
                                    {hospital.address}
                                </p> */}
                            </div>
                            {/* 병원 정보 종료  */}

                            {/* 요청 상태 시작 */}
                            <div className="flex gap-1 h-3 items-center">
                                <span
                                    className={`inline-block w-2 h-2 rounded-full ${hospital.status === "approved" ? "bg-sub-100" : "bg-primary-200"}`}
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
                                <span className="body3 text-gray-300 ml-1">
                                    {hospital.createdAt}
                                </span>
                            </p>

                            {/* 버튼 시작 */}
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
                            {/* 버튼 종료  */}
                        </div>
                    </div>
                ))}
            </form>

            {/* <AdminNav /> */}
        </>
    );
}

export default Approval;
