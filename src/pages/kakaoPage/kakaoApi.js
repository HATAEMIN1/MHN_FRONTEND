import axios from "axios";

const host = process.env.REACT_APP_API_SERVER_HOST;

const rest_api_key = "aaa81e472b343d043c8b6de0150d49a3";
const redirect_uri = "http://localhost:3000/member/kakao";
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
    const res = await axios.get(
        `${host}/api/member/kakao?accessToken=${accessToken}`
    );
    return res.data;
};
