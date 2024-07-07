import React from "react";
import Header from "../../layouts/header/Header";
import NavBar from "../../layouts/nav/NavBar";

const { IMP } = window;
IMP.init("imp05251176"); // 'imp00000000' 대신 발급받은 가맹점 식별코드를 사용합니다.
function Payment() {
    function onClickPayment() {
        /* 1. 가맹점 식별하기 */
        IMP.init("imp05251176");
        /* 2. 결제 데이터 정의하기 */
        const data = {
            pg: "kakaopay", // PG사 (필수)
            merchant_uid: "order_monthly_0001", // 주문번호 (필수)
            name: "주문명:결제테스트",
            amount: 10, // 결제금액 (필수) 숫자타입이여야함
            customer_uid: "gkxoals33@gmail.com",
            buyer_name: "포트원", // 구매자 이름
            buyer_tel: "02-1234-1234", // 구매자 전화번호
            buyer_email: "gkxoals33@gmail.com", // 구매자 이메일
            // buyer_addr: "서울특별시 강남구 삼성동",
            // buyer_postcode: "123-456",
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
        //         m_redirect_url: "{모바일에서 결제 완료 후 리디렉션 될 URL}",
        //     },
        //     callback
        // );
    }

    /* 3. 콜백 함수 정의하기 */
    function callback(response) {
        const { success, merchant_uid, error_msg } = response;

        if (success) {
            alert("결제 성공");
        } else {
            alert(`결제 실패: ${error_msg}`);
        }
    }

    return (
        <>
            <Header></Header>
            <div>Payment</div>
            <button onClick={onClickPayment}>결제하기</button>
            <NavBar></NavBar>
        </>
    );
}

export default Payment;
