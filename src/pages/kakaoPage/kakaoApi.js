import axios from "axios";

const host = process.env.REACT_APP_API_SERVER_HOST || "http://localhost:8080";

const rest_api_key = `${process.env.REACT_APP_KAKAO_RESTAPIKEY}`;
const redirect_uri = `${process.env.REACT_APP_SERVER}/member/kakao`;
const auth_code_path = "https://kauth.kakao.com/oauth/authorize";
const access_token_url = "https://kauth.kakao.com/oauth/token";

export const getKakaoLoginLink = () => {
    const kakaoUrl = `${auth_code_path}?client_id=${rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;
    return kakaoUrl;
};

export const getAccessToken = async (authCode) => {
    const headers = {
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
    };
    const params = new URLSearchParams({
        grant_type: "authorization_code",
        client_id: rest_api_key,
        redirect_uri: redirect_uri,
        code: authCode,
    });
    const res = await axios.post(access_token_url, params, { headers });

    const accessToken = res.data.access_token;
    return accessToken;
};

export const getMemberWithAccessToken = async (accessToken) => {
    const res = await axios.get(`${host}/api/v1/member/kakao`, {
        params: { accessToken },
    });
    return res.data;
};
