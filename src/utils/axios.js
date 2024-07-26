import axios from "axios";
import { getCookie, setCookie } from "./cookieUtil";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/api/v1",
    // baseURL: process.env.REACT_APP_NODE_SERVER_URL,
});

const refreshJWT = async (accessToken, refreshToken) => {
    const host = process.env.REACT_APP_SPRING_SERVER_UPLOAD_URL || "localhost";
    const header = { headers: { Authorization: `Bearer ${accessToken}` } };
    const res = await axios.get(
        `${host}/api/member/refresh?refreshToken=${refreshToken}`,
        header
    );
    return res.data;
};

// 요청 인터셉터
// axiosInstance.interceptors.request.use(
//     (config) => {
//         const memberInfo = getCookie("member");
//         if (!memberInfo) {
//             return Promise.reject({
//                 response: { data: { error: "REQUIRE_LOGIN" } },
//             });
//         }
//         const { accessToken } = memberInfo;
//         config.headers.Authorization = `Bearer ${accessToken}`;
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

// 응답 인터셉터
axiosInstance.interceptors.response.use(
    async (response) => {
        const data = response.data;
        if (data && data.error === "ERROR_ACCESS_TOKEN") {
            const memberCookieValue = getCookie("member");
            const result = await refreshJWT(
                memberCookieValue.accessToken,
                memberCookieValue.refreshToken
            );
            memberCookieValue.accessToken = result.accessToken;
            memberCookieValue.refreshToken = result.refreshToken;
            setCookie("member", JSON.stringify(memberCookieValue), 1);
            const originalRequest = response.config;
            originalRequest.headers.Authorization = `Bearer ${result.accessToken}`;
            return await axiosInstance(originalRequest);
        }
        return response;
    },
    (error) => {
        if (error.response && error.response.data === "jwt expired") {
            window.location.reload();
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
