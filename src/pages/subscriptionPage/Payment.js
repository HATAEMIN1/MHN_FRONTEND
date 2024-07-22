import React from "react";
import Header from "../../layouts/header/Header";
import NavBar from "../../layouts/nav/NavBar";
import ButtonBlack from "../../components/button/ButtonBlack";
import axiosInstance from "../../utils/axios";
import { useNavigate } from "react-router-dom";

const { IMP } = window;
function Payment() {
    const navigate = useNavigate();
    const pg = "kakaopay";
    const merchantUid = generateRandomString("merchantUid");
    const customerUid = generateRandomString("billingKey");
    const userName = "포트원";
    const tel = "02-1234-1234";
    function generateRandomString(prefix) {
        // 현재 시간을 밀리초 단위로 가져옵니다.
        const timestamp = new Date().getTime();
        // 랜덤한 16진수 문자열을 생성합니다.
        const randomPart = Math.random().toString(16).substr(2, 8);
        // prefix, timestamp, 랜덤 문자열을 조합합니다.
        return `${prefix}_${timestamp}_${randomPart}`;
    }
    const currentDate = () => {
        return new Date()
            .toLocaleDateString("ko-KR", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
            })
            .replace(/\. /g, ".")
            .replace(/\.$/, "");
    };

    const nextPaymentDate = () => {
        const d = new Date();
        d.setMonth(d.getMonth() + 1);
        return d
            .toLocaleDateString("ko-KR", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
            })
            .replace(/\. /g, ".")
            .replace(/\.$/, "");
    };
    const onClickPayment = () => {
        /* 1. 가맹점 식별하기 */
        const imp_uid = "imp05251176";
        IMP.init(imp_uid); //imp_uid
        /* 2. 결제 데이터 정의하기 */
        const data = {
            pg: pg, // PG사 (필수)
            merchant_uid: merchantUid, //(주문번호) 빌링키 발급용 주문번호
            customer_uid: customerUid, //(빌링키) 카드(빌링키)와 1:1로 대응하는 값  빌링키 <-이걸로 재 결제해야함
            name: "구독 정기결제", //(상품 이름)
            amount: 8900, // (결제금액)
            buyer_name: userName, // (고객이름)
            buyer_tel: tel, // (구매자 전화번호)
            // buyer_email: "gkxoals33@gmail.com", // 구매자 이메일
            m_redirect_url: "http://localhost:3000/subscription/payment",
        };
        /* 4. 결제 창 호출하기 */
        IMP.request_pay(data, callback);
    };
    /* 3. 콜백 함수 정의하기 */
    const callback = (response) => {
        console.log("리스폰스값들: ");
        console.log(response);
        const {
            pg_provider,
            paid_amount,
            merchant_uid,
            customer_uid,
            name,
            buyer_name,
            buyer_tel,
            imp_uid,
            error_msg,
        } = response;
        // const error_msg = response.error_msg;
        // const merchant_uid = response.merchant_uid; //주문번호
        // const imp_uid = response.imp_uid; //고유번호
        if (response.success) {
            console.log("결제 성공");
            paymentSubmit(
                pg_provider,
                paid_amount,
                merchant_uid,
                customer_uid,
                name,
                buyer_name,
                buyer_tel,
                imp_uid,
                error_msg
            ); //결제내역 저장
            ReservationPayment();
        } else {
            alert(`결제 실패: ${error_msg}`);
        }
    };
    const paymentSubmit = async (
        pg_provider,
        paid_amount,
        merchant_uid,
        customer_uid,
        name,
        buyer_name,
        buyer_tel,
        imp_uid,
        error_msg
    ) => {
        try {
            const body = {
                impUid: imp_uid,
                pg: pg_provider,
                amount: paid_amount,
                merchantUid: merchant_uid,
                customerUid: customer_uid,
                productName: name,
                buyerName: buyer_name,
                buyerTel: buyer_tel,
                nextBillingDate: nextPaymentDate(),
            };
            const res = await axiosInstance.post("/subscriptions", body);
            console.log(res.data, "디비저장완료");
            // navigate("/subscription/:userId");
        } catch (e) {
            console.log("디비저장실패", e);
        }
    };
    const ReservationPayment = async () => {
        try {
            const res = axiosInstance.get("/payments");

            const billingKeyRequestData = {
                schedules: [
                    {
                        merchant_uid: generateRandomString("Reservation"),
                        schedule_at: Math.floor(Date.now() / 1000) + 86400, // 예: 24시간 후
                        currency: "KRW",
                        amount: 8900, // 예시 금액
                        name: "정기결제 상품",
                        buyer_name: userName,
                        buyer_email: "gildong@example.com",
                        buyer_tel: "010-1234-5678",
                    },
                ],
            };

            const response = await axiosInstance.post(
                "payments/billing",
                billingKeyRequestData
            );
            console.log("결제 예약 성공:", response.data);
        } catch (error) {
            console.error("결제 예약 실패:", error);
        }
    };

    return (
        <>
            <Header></Header>
            <form>
                <div className="flex justify-between items-center p-4 border-b ">
                    <h2 className="subtitle1">주문 고객</h2>
                    <div className="flex">
                        <p className="body2">{userName}</p>
                        <p className="body2">{tel}</p>
                    </div>
                </div>
                <div>
                    <div className="flex justify-between items-center p-4 ">
                        <h2 className="subtitle1">멤버십 정보</h2>
                        <div className="flex">
                            <p>1개월 / </p>
                            <p>8,900원</p>
                        </div>
                    </div>

                    <div className="flex gap-4  px-4 border-b ">
                        <div className="w-[50px] mb-4">
                            <img
                                src="/assets/logoColor.png"
                                className="w-full block rounded-md"
                            />
                        </div>
                        <p className="subtitle2">멍햄냥 멤버십(구독형)</p>
                    </div>
                </div>
                <div className="subtitle1 p-4 ">정기 결제수단</div>
                <div className="px-4 border-b pb-4">
                    <select className="w-full p-2 border-2 rounded-md">
                        <option value="kakaopay">카카오 페이</option>
                    </select>
                </div>
                <div className="subtitle1 p-2 px-4  ">멤버십 기간</div>
                <div className="px-4 flex justify-between items-center">
                    <div className="subtitle2">혜택 기간</div>
                    <div className="flex">
                        <p>{currentDate()}</p>
                        <p>~</p>
                        <p>{nextPaymentDate()}</p>
                    </div>
                </div>
                <div className="p-4 font-semibold border-b pb-8">
                    가입일 기준으로 매월 자동 결제 되며,언제든지 해제
                    가능합니다.
                </div>
                <div className="subtitle1 p-2 px-4  ">결제 정보</div>
                <div className="flex justify-between items-center px-4">
                    <div className=" subtitle2">결제 금액</div>
                    <p className="body2">8,900원</p>
                </div>
                <div className="flex p-4 justify-between items-center border-b">
                    <div className="subtitle2">다음 결제 예정일</div>
                    <p className="body2">{nextPaymentDate()}</p>
                </div>
                <div className="flex p-4 justify-between items-center border-b">
                    <div className="subtitle2">최종 결제 금액</div>
                    <p className="body2">8,900원</p>
                </div>
                <div className="p-4 justify-center flex">
                    <p>
                        위 내용을 확인하였으며, 멍햄냥 멤버십 가입에 동의합니다.
                    </p>
                </div>
                {/*<div*/}
                {/*    onClick={() => {*/}
                {/*        getAccessToken();*/}
                {/*    }}*/}
                {/*>*/}
                {/*    액세스 겟 토큰*/}
                {/*</div>*/}
            </form>
            <ButtonBlack
                text1="8,900원 정기 결제하기"
                height="45px"
                width="100%"
                handleClick={onClickPayment}
            ></ButtonBlack>
            <NavBar></NavBar>
        </>
    );
}

export default Payment;
