import React from "react";
import Header from "../../layouts/header/Header";
import NavBar from "../../layouts/nav/NavBar";
import ButtonBlack from "../../components/button/ButtonBlack";
import axiosInstance from "../../utils/axios";
import { useNavigate } from "react-router-dom";

const { IMP } = window;
// IMP.init("imp05251176"); // 'imp00000000' 대신 발급받은 가맹점 식별코드를 사용합니다.
function Payment() {
    const navigate = useNavigate();
    function onClickPayment() {
        /* 1. 가맹점 식별하기 */
        const imp_uid = "imp05251176";
        IMP.init(imp_uid); //imp_uid
        /* 2. 결제 데이터 정의하기 */
        const data = {
            pg: "kakaopay", // PG사 (필수)
            merchant_uid: "order_monthly_12", // 주문번호 (필수)
            name: "gkxoals33@gmail.com", //필수
            amount: 8900, // 결제금액 (필수) 숫자타입이여야함
            // customer_uid: "gkxoals33@gmail.com",
            // buyer_name: "포트원", // 구매자 이름
            buyer_tel: "02-1234-1234", // 구매자 전화번호
            // buyer_email: "gkxoals33@gmail.com", // 구매자 이메일
            // m_redirect_url: "{모바일에서 결제 완료 후 리디렉션 될 URL}",
        };

        /* 4. 결제 창 호출하기 */
        IMP.request_pay(data, callback);
        // IMP.request_pay(
        //     {
        //         pg: "kakaopay",
        //         merchant_uid: "order_monthly_0001", // 상점에서 관리하는 주문 번호
        //         name: "최초인증결제",
        //         amount: 10, // 결제창에 표시될 금액. 실제 승인이 이뤄지지는 않습니다.
        //         customer_uid: "your-customer-unique-id", // 필수 입력.
        //         buyer_email: "test@portone.io",
        //         buyer_name: "포트원",
        //         buyer_tel: "02-1234-1234",
        //
        //     },
        //     callback
        // );
    }

    /* 3. 콜백 함수 정의하기 */
    function callback(response) {
        console.log("리스폰스값들: ");
        console.log(response);
        const {
            success,
            pg_provider,
            paid_amount,
            merchant_uid,
            name,
            buyer_tel,
            imp_uid,
            error_msg,
        } = response;
        // const error_msg = response.error_msg;
        // const merchant_uid = response.merchant_uid; //주문번호
        // const imp_uid = response.imp_uid; //고유번호
        if (response.success) {
            console.log("결제 성공");
            checkPayment(imp_uid, merchant_uid); //결제 검증
            paymentSubmit(
                imp_uid,
                pg_provider,
                paid_amount,
                merchant_uid,
                name,
                buyer_tel
            ); //결제내역 저장
        } else {
            alert(`결제 실패: ${error_msg}`);
        }
    }
    //백엔드 검증 함수
    const checkPayment = async (
        imp_uid,
        pg,
        amount,
        merchant_uid,
        name,
        buyer_tel
    ) => {
        try {
            console.log("백엔드 검증 실행");
            console.log("imp_uid는" + imp_uid);
            const res = await axiosInstance.get("/verify/" + imp_uid);
            console.log("결제 검증 완료", res.data);
            //db에 저장
            // pointSubmit(merchant_uid);
        } catch (error) {
            console.error("결제 검증 실패", error);
        }
    };
    const paymentSubmit = async (
        imp_uid,
        pg_provider,
        paid_amount,
        merchant_uid,
        name,
        buyer_tel
    ) => {
        try {
            const body = {
                impUid: imp_uid,
                pg: pg_provider,
                amount: paid_amount,
                merchantUid: merchant_uid,
                email: name,
                buyer_tel,
            };
            const res = await axiosInstance.post("/subscriptions", body);
            console.log(res.data, "디비저장완료");
            navigate("/subscription/:userId");
        } catch (e) {
            console.log("디비저장실패", e);
        }
    };
    return (
        <>
            <Header></Header>
            <form>
                <div className="flex justify-between items-center p-4 border-b ">
                    <h2 className="subtitle1">주문 고객</h2>
                    <div className="flex">
                        <p className="body2">김츄츄</p>
                        <p className="body2">(010-1234-5678)</p>
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
                        <p>2024.06.25</p>
                        <p>~</p>
                        <p>2024.07.25</p>
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
                    <p className="body2">2024.07.24</p>
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
