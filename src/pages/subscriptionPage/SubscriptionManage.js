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
        console.log(formattedData);
    };
    const handleSubscriptionPaused = async () => {
        const res = await axiosInstance.post("/payments/unschedule", {
            memberId: mySubscription.id,
        });
        console.log(res.data);
        mySubscribe();
    };
    useEffect(() => {
        mySubscribe();
    }, []);
    useEffect(() => {
        console.log("유즈이펙트한번더옴");
        if (mySubscription && mySubscription.status === "CANCELLED") {
            navigate("/subscription");
        }
    }, [mySubscription, navigate]);
    return (
        <>
            <Header title="구독 내역"></Header>
            <div className="subtitle1 p-4 mt-8">이용중</div>
            <div className="p-4 border-b">
                전문가 1:1 채팅상담 + 진료 기록 내역 조회
            </div>
            <div className="p-4 flex justify-between items-center px-16 ">
                <div className="subtitle2">
                    {mySubscription && getStatusText(mySubscription.status)}
                </div>
                <div>
                    <div className="flex gap-4 justify-between p-2">
                        <div className="body2">결제일</div>
                        <div className="body2">
                            {mySubscription && mySubscription.paymentDate}
                        </div>
                    </div>
                    <div className="flex gap-4 justify-between p-2">
                        <div className="body2">만료일</div>
                        <div className="body2">
                            {mySubscription && mySubscription.nextBillingDate}
                        </div>
                    </div>
                    <div className="flex gap-4 justify-between p-2">
                        <div className="body2">결제금액</div>
                        <div className="body2">8,900원</div>
                    </div>
                    <div className="flex gap-4 justify-between p-2">
                        <div className="body2">결제방법</div>
                        <div className="body2">카카오 페이</div>
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
                                // handleClick={handleSubscriptionPaused}
                                handleClick={openModal}
                                // 이거 눌렀을 때 모달이 나와야하고, 모달에서 예 버튼을 눌렀을 때 handleSubscriptionPaused 함수가 실행되어야 함.
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
