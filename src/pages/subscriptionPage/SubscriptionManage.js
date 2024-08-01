import React, { useEffect, useState } from "react";
import Header from "../../layouts/header/Header";
import NavBar from "../../layouts/nav/NavBar";
import ButtonBlack from "../../components/button/ButtonBlack";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../utils/axios";
import ModalManager from "../../components/modal/ModalManager";
import ButtonClear from "../../components/button/ButtonClear";

function SubscriptionManage(props) {
    const navigate = useNavigate();
    const statusMap = {
        ACTIVE: "구독 중",
        PAUSED: "해지 중",
        CANCELLED: "구독 해제",
    };
    function getStatusText(status) {
        return statusMap[status];
    }
    const { userId } = useParams();
    const [mySubscription, setMySubscription] = useState("");

    function formatDate(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}.${month}.${day}`;
    }
    const mySubscribe = async () => {
        const params = { userId };
        const res = await axiosInstance.get("subscriptions", { params });
        const formattedData = {
            ...res.data,
            paymentDate: formatDate(res.data.paymentDate),
            nextBillingDate: formatDate(res.data.nextBillingDate),
        };
        setMySubscription(formattedData);
    };
    const handleSubscriptionPaused = async () => {
        const res = await axiosInstance.post("/payments/unschedule", {
            memberId: mySubscription.id,
        });
        mySubscribe();
    };
    useEffect(() => {
        mySubscribe();
    }, []);
    useEffect(() => {
        if (mySubscription && mySubscription.status === "CANCELLED") {
            navigate("/subscription");
        }
    }, [mySubscription, navigate]);
    return (
        <>
            <Header title="구독 내역"></Header>
            <div className="bg-white top-0 z-50 w-[100%]  top-0 left-0 right-0 absolute h-[65px] px-[16px] flex items-center justify-between">
                <div className="h-[100%] flex items-center">
                    <img
                        src="/assets/images/backIcon.svg"
                        alt=""
                        className="w-[30px] h-[30px] cursor-pointer"
                        onClick={() => {
                            navigate("/account");
                        }}
                    />
                </div>

                <div className="h-[100%] flex items-center">
                    <img
                        src="/assets/images/backIcon.svg"
                        alt=""
                        className="w-[30px] h-[30px] invisible"
                    />
                </div>
                {/* 테스트 아이콘36 / 헤더폰트 20px / */}
            </div>
            <div className=" p-4 mt-8">
                <p className="subtitle1 text-primary-300">이용중</p>
            </div>
            <div className="p-4 border-b">
                <p className="body2 text-sub-200">
                    전문가 1:1 채팅상담 + 진료 기록 내역 조회
                </p>
            </div>
            <div className="p-4 flex justify-between items-center px-16 ">
                <div className="subtitle2 text-primary-100">
                    {mySubscription && getStatusText(mySubscription.status)}
                </div>
                <div>
                    <div className="flex gap-4 justify-between p-2">
                        <div className="body2 text-primary-300">결제일</div>
                        <div className="body2 text-sub-100">
                            {mySubscription && mySubscription.paymentDate}
                        </div>
                    </div>
                    <div className="flex gap-4 justify-between p-2">
                        <div className="body2 text-primary-300">만료일</div>
                        <div className="body2 text-sub-100">
                            {mySubscription && mySubscription.nextBillingDate}
                        </div>
                    </div>
                    <div className="flex gap-4 justify-between p-2">
                        <div className="body2 text-primary-300">결제금액</div>
                        <div className="body2 text-sub-100">8,900원</div>
                    </div>
                    <div className="flex gap-4 justify-between p-2">
                        <div className="body2 text-primary-300">결제방법</div>
                        <div className="body2 text-sub-100">카카오페이</div>
                    </div>
                </div>
            </div>
            <div className="flex justify-center border-b pb-8">
                {mySubscription.status === "ACTIVE" ? (
                    <ModalManager
                        modalContent={({ closeModal }) => (
                            <div>
                                <p>구독을 해제할까요?</p>
                                <p className="mini text-red-700 mb-[8px]">
                                    구독 해제시, 재구독이 어려울 수 있습니다.
                                </p>
                                <ButtonClear
                                    text1="네"
                                    text2="아니요"
                                    handleClick={(e) => {
                                        handleSubscriptionPaused();
                                        closeModal();
                                    }}
                                    handleClick2={(e) => {
                                        closeModal();
                                    }}
                                />
                            </div>
                        )}
                    >
                        {({ openModal }) => (
                            <ButtonBlack
                                text1="자동 결제 해지"
                                height="45px"
                                width="80%"
                                handleClick={openModal}
                            ></ButtonBlack>
                        )}
                    </ModalManager>
                ) : (
                    <ButtonBlack
                        text1="구독 하기"
                        height="45px"
                        width="80%"
                        // handleClick={handleSubscriptionPaused}
                    ></ButtonBlack>
                )}
            </div>

            <NavBar></NavBar>
        </>
    );
}

export default SubscriptionManage;
