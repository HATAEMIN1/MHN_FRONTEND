import React from "react";
import Header from "../../layouts/header/Header";
import NavBar from "../../layouts/nav/NavBar";
import ButtonBlack from "../../components/button/ButtonBlack";

function SubscriptionManage(props) {
    return (
        <>
            <Header title="구독 내역"></Header>
            <div className="subtitle1 p-4 mt-8">이용중</div>
            <div className="p-4 border-b">
                전문가 1:1 채팅상담 + 진료 기록 내역 조회
            </div>
            <div className="p-4 flex justify-between items-center px-16 ">
                <div className="subtitle2">구독중</div>
                <div>
                    <div className="flex gap-4 justify-between p-2">
                        <div className="body2">결제일</div>
                        <div className="body2">2024.06.27</div>
                    </div>
                    <div className="flex gap-4 justify-between p-2">
                        <div className="body2">만료일</div>
                        <div className="body2">2024.07.27</div>
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
