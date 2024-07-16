import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/api/v1",
    // baseURL: process.env.REACT_APP_NODE_SERVER_URL,
});

// 요청 인터셉터 추가하기
axiosInstance.interceptors.request.use(
    function (config) {
        // 요청이 전달되기 전에 작업 수행
        config.headers.Authorization =
            "Bearer " + localStorage.getItem("accessToken");
        return config;
    },
    function (error) {
        // 요청 오류가 있는 작업 수행
        return Promise.reject(error);
    }
);

// 응답 인터셉터 추가하기
axiosInstance.interceptors.response.use(
    function (response) {
        // 2xx 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
        // 응답 데이터가 있는 작업 수행
        return response;
    },
    function (error) {
        // 2xx 외의 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
        // 응답 오류가 있는 작업 수행
        if (error.response.data === "jwt expired") {
            window.location.reload();
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
