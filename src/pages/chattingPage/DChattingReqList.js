import React, { useEffect, useState } from "react";
import Header from "../../layouts/header/Header";
import ChattingListForm from "../../components/Form/ChattingListForm";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function DChattingReqList() {
    // Redux store에서 loginState를 가져옵니다.
    const loginState = useSelector((state) => state.userSlice);

    const navigate = useNavigate();
    const hospitalExam = [
        {
            content:
                "안뇽하세욥 저희 꼬북이땜에 궁금한게있는데용 sdfsdfsdfsdfsdf 가나ㅣ러냐ㅣ뎌ㅓ갸ㅐㅣㄵ뎌갸ㅐㄴ더라ㅣ너ㅜ이ㅏㄹ혐;이섬;ㅑㅐㄷㅈ셔ㅓㅁ;갸ㅐㅔㅅ",
        },
        {
            content: "어쩌구저쩌구어어어어어어ㅏ 브랄브라브밥르발블",
        },
    ];

    useEffect(() => {
        // loginState가 존재하고 doctorStatus가 PENDING일 때만 리다이렉트합니다.
        if (loginState && loginState.doctorStatus === "PENDING") {
            navigate("/doctors/register/pending");
        }
    }, [loginState, navigate]);

    // loginState가 없거나 doctorStatus가 PENDING이면 아무것도 렌더링하지 않습니다.
    if (!loginState || loginState.doctorStatus === "PENDING") {
        return null;
    }

    // PENDING 상태가 아닐 경우 원래의 컴포넌트 내용을 렌더링합니다.
    return (
        <>
            <Header title="실시간 채팅 요청" />
            {hospitalExam.map((item, index) => {
                return (
                    <Link
                        to="/hospitals/:hpId"
                        className="w-full block"
                        key={index}
                    >
                        {/* 여기 경로값에는 원래 채팅방 뷰페이지로 이동하도록 해야합니다  */}
                        <div className="flex justify-between items-center my-[16px] border">
                            <div className="flex items-center flex-grow gap-[8px]">
                                <div className="w-[50px] flex-shrink-0 ">
                                    <img
                                        src="/assets/images/testDog.svg"
                                        className="block w-full rounded-[50px]"
                                        alt="Test Dog"
                                    />
                                </div>
                                <div>
                                    <div className="py-[4px] subtitle3 text-primary-300">
                                        {item.content.substring(0, 12) +
                                            (item.content.length > 12
                                                ? "..."
                                                : "")}
                                    </div>
                                    <div className="body2 text-sub-100">
                                        {item.content.substring(0, 45) +
                                            (item.content.length > 45
                                                ? "..."
                                                : "")}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                );
            })}
        </>
    );
}

export default DChattingReqList;
