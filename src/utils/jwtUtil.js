import axios from "axios";
import { getCookie, setCookie } from "./cookieUtil";

const jwtAxios = axios.create();

const refreshJWT = async (accessToken, refreshToken) => {
    const host = process.env.REACT_APP_SPRING_SERVER_UPLOAD_URL || "localhost";
    const header = { headers: { Authorization: `Bearer ${accessToken}` } };
    const res = await axios.get(
        `${host}/api/member/refresh?refreshToken=${refreshToken}`,
        header
    );
    return res.data;
};

const beforeReq = (config) => {
    const memberInfo = getCookie("member");
    if (!memberInfo) {
        return Promise.reject({
            response: { data: { error: "REQUIRE_LOGIN" } },
        });
    }
    const { accessToken, email } = memberInfo;
    // Authorization 헤더 처리
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
};

const requestFail = (err) => {
    return Promise.reject(err);
};

const beforeRes = async (res) => {
    const data = res.data;
    if (data && data.error === "ERROR_ACCESS_TOKEN") {
        const memberCookieValue = getCookie("member");
        const result = await refreshJWT(
            memberCookieValue.accessToken,
            memberCookieValue.refreshToken
        );
        memberCookieValue.accessToken = result.accessToken;
        memberCookieValue.refreshToken = result.refreshToken;
        setCookie("member", JSON.stringify(memberCookieValue), 1);
        const originalRequest = res.config;
        originalRequest.headers.Authorization = `Bearer ${result.accessToken}`;
        return await axios(originalRequest);
    }
    return res;
};

const responseFail = (err) => {
    return Promise.reject(err);
};

jwtAxios.interceptors.request.use(beforeReq, requestFail);
jwtAxios.interceptors.response.use(beforeRes, responseFail);
export default jwtAxios;
