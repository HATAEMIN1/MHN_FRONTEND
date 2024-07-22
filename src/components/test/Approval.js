import React from "react";
import Header from "../../layouts/header/Header";
import AdminNav from "../../layouts/nav/AdminNav";

function Approval() {
    const hospitals = [
        {
            id: 1,
            name: "코드랩 동물병원",
            email: "aaa@naver.com",
            imgSrc: "/assets/images/petDogIcon.svg",
        },
        {
            id: 2,
            name: "이노24시 동물병원",
            email: "bbb@naver.com",
            imgSrc: "/assets/images/petCatIcon.svg",
        },
        {
            id: 3,
            name: "n동물의료센터",
            email: "bbb@naver.com",
            imgSrc: "/assets/images/petCatIcon.svg",
        },
        {
            id: 4,
            name: "아이이 동물병원",
            email: "bbb@naver.com",
            imgSrc: "/assets/images/petCatIcon.svg",
        },
        {
            id: 5,
            name: "가나다라 동물병원",
            email: "bbb@naver.com",
            imgSrc: "/assets/images/petCatIcon.svg",
        },
        {
            id: 6,
            name: "가디24시 동물병원",
            email: "bbb@naver.com",
            imgSrc: "/assets/images/petCatIcon.svg",
        },
        {
            id: 7,
            name: "동동 동물병원",
            email: "bbb@naver.com",
            imgSrc: "/assets/images/petCatIcon.svg",
        },
    ];
    return (
        <>
            <Header title="가입승인" />
            {hospitals.map((hospital) => (
                <form key={hospital.id}>
                    {/* list s  */}
                    <div className="w-full flex justify-between py-2 mb-4 border-b border-gray-100">
                        {/* name,email s */}
                        <div>
                            <p className="subtitle3 text-primary-300">
                                {hospital.name}
                            </p>
                            <p className="body2 text-sub-100">
                                {hospital.email}
                            </p>
                        </div>
                        {/* name,email e */}

                        {/* btn s  */}
                        <button className="cursor-pointer">
                            <span className="body2 text-primary-200">승인</span>
                        </button>
                        {/* btn e  */}
                    </div>
                    {/* list e  */}
                </form>
            ))}
            <AdminNav />
        </>
    );
}

export default Approval;
