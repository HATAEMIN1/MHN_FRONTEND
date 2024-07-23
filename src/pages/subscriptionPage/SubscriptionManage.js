import React, { useEffect, useState } from "react";
import Header from "../../layouts/header/Header";
import NavBar from "../../layouts/nav/NavBar";
import ButtonBlack from "../../components/button/ButtonBlack";
import { useParams } from "react-router-dom";
import axiosInstance from "../../utils/axios";

function SubscriptionManage(props) {
    const statusMap = {
        ACTIVE: "구독 중",
        CANCELLED: "해지 중",
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
    useEffect(() => {
        mySubscribe();
    }, []);
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
                <ButtonBlack
                    text1="자동 결제 해지"
                    height="45px"
                    width="80%"
                ></ButtonBlack>
            </div>

            <NavBar></NavBar>
        </>
    );
}

export default SubscriptionManage;
