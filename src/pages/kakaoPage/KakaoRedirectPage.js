import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAccessToken, getMemberWithAccessToken } from "./kakaoApi";
import { kakaoLogin } from "../../store/thunkFunction";

function KakaoRedirectPage() {
    const [searchParam] = useSearchParams();
    const authCode = searchParam.get("code");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const Loading = () => (
        <div className="flex justify-center items-center h-full">
            <img src="/assets/loading.gif" alt="Loading" />
        </div>
    );
    useEffect(() => {
        if (authCode) {
            const fetchTokenAndLogin = async () => {
                try {
                    console.log("인증 코드:", authCode); // 인증 코드 로그 확인
                    const accessToken = await getAccessToken(authCode);
                    console.log("######accessToken#####");
                    console.log(accessToken);

                    const memberInfo =
                        await getMemberWithAccessToken(accessToken);
                    console.log("######memberInfo#####");
                    console.log(memberInfo);

                    dispatch(kakaoLogin({ ...memberInfo, token: accessToken }));
                    navigate("/");
                } catch (error) {
                    console.error(
                        "카카오 로그인 중 오류가 발생했습니다:",
                        error
                    );
                }
            };

            fetchTokenAndLogin();
        } else {
            console.error("인증 코드가 없습니다.");
        }
    }, [authCode, dispatch, navigate]);

    return <div>{Loading}</div>;
}

export default KakaoRedirectPage;
