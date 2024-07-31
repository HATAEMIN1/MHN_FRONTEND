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

    return (
        <div>
            <div>KakaoRedirectPage</div>
            {authCode ? (
                <div>인증 코드: {authCode}</div>
            ) : (
                <div>인증 코드가 없습니다.</div>
            )}
        </div>
    );
}

export default KakaoRedirectPage;
