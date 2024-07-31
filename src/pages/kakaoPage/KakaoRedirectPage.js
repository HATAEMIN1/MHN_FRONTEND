import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAccessToken, getMemberWithAccessToken } from "./kakaoApi";

function KakaoRedirectPage() {
    const [searchParam] = useSearchParams();
    const authCode = searchParam.get("code");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        getAccessToken(authCode).then((accessToken) => {
            console.log("######accessToken#####");
            console.log(accessToken);
            getMemberWithAccessToken(accessToken).then((memberInfo) => {
                console.log("######memberInfo#####");
                console.log(memberInfo);
                dispatch(login(memberInfo));
                navigate("/");
            });
        });
    }, [authCode]);

    return (
        <div>
            <div>KakaoRedirectPage</div>
            <div>{authCode}</div>
        </div>
    );
}

export default KakaoRedirectPage;
