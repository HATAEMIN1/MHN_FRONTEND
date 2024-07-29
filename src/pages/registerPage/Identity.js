import React from "react";
import axiosInstance from "../../utils/axios";
const { IMP } = window;
function Identity(props) {
    const imp_uid = "imp05251176 ";
    IMP.init(imp_uid);
    const certificationData = {
        // param
        // 주문 번호
        pg: "inicis_unified", //본인인증 설정이 2개이상 되어 있는 경우 필
        merchant_uid: "ORD20180131-0000011",
        // company: "아임포트", // 회사명 또는 URL
        // carrier: "SKT", // 통신사
        // name: "홍길동", // 이름
        // phone: "01012341234",
        // 모바일환경에서 popup:false(기본값) 인 경우 필수
        m_redirect_url: "http://localhost:3000/users/register",
        // PC환경에서는 popup 파라미터가 무시되고 항상 true 로 적용됨
        popup: false,
    };
    const callbackCertification = async (res) => {
        try {
            console.log(res.success);
            console.log(res.error_code);
            console.log(res.merchant_uid);
            console.log(res.imp_uid);
            console.log(res.error_msg);
            // await axiosInstance.post("/certification", {
            //     imp_uid: res.imp_uid,
            // });
        } catch (e) {
            // alert("인증에 실패하였습니다. 에러 내용: " + res.error_msg);
            console.log(res.error_msg);
            console.log(e);
        }
        if (res.success) {
        }
    };
    const handleCertification = () => {
        IMP.certification(certificationData, callbackCertification);
    };
    return (
        <div>
            <div onClick={handleCertification}>본인 인증 호출</div>
        </div>
    );
}

export default Identity;
